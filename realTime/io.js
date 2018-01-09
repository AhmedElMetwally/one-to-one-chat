const User = require('../module/user');
const Message = require('../module/message');
const async = require('async');
const jwt = require('jsonwebtoken');
const secret = process.env.secret;


module.exports =  io => {
    io.on('connection', socket => {

        // start login
        // sent token in event login
        // # check token 
        // # update socketId in DB after decode token  
        // get all users from DB
        // set Property online : (true or false) to online user
        // compare users from DB with users online connected  ->  DB.user.socketId  == Object.keys(io.eio.clients)
        // sent all users and online true or false
        socket.on('login' , token  =>  { 
            jwt.verify( token , secret , (err , decode)=>{
                User.update({_id : decode.user._id} , {socketId : socket.id})
                    .then(res => {
                        User.find({})
                            .lean() // this is very import to change Property in mongoose 
                            .then(users =>{
                                var onlineClients = Object.keys(io.eio.clients);
                                var _users = [];
                                for(var user of users){
                                    if(onlineClients.indexOf(user.socketId) > -1){
                                        user.online = true;
                                        _users.push(user);
                                    }else{
                                        user.online = false;
                                        _users.push(user);
                                    }
                                }
                                io.emit('login' ,  _users)
                            })
                            .catch(err => {
                                // io.emit('login' ,  false)
                            })
                    })
                    .catch(err => {
                        // io.emit('login' ,  false)
                    })
            });
        })


        // start refresh
        // on disconnect any user
        // get all users from DB
        // compare users from DB with users online connected  ->  DB.user.socketId  == Object.keys(io.eio.clients)
        // sent all users and online true or false
        socket.on('disconnect' , () => {
            User.find({})
                .lean() // this is very import to change Property in mongoose 
                .then(users =>{
                    users.map(v => v.online = null);
                    var onlineClients = Object.keys(io.eio.clients);
                    var _users = [];
                    for(var user of users){
                        if(onlineClients.indexOf(user.socketId) > -1){
                            user.online = true;
                            _users.push(user);
                        }else{
                            user.online = false;
                            _users.push(user);
                        }
                    }
                    io.emit('refresh' ,  _users)
                })
                .catch(err => {
                    // io.emit('refresh' ,  false)
                })
        })



        // use parallel
        // to emit msg
        // to save msg
        // emit new msg with full user and full caller and content
        // save new msg with userid and senterid and content and created
        socket.on('msg' , msg => {
            async.parallel([
                () => {
                    io.to(msg.caller.socketId).emit('msg' , msg)
                },
                () => {
                    var message = new Message({
                        content : msg.content,
                        user : msg.user._id,
                        caller : msg.caller._id
                    });
                    message.save()
                        .then( () => {
                            // console.log('save msg')
                        })
                        .catch( err => {
                            // console.log('Error save msg')
                        })
                }
            ])
        })






    });
}