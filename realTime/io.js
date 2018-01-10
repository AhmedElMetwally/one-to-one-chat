const User = require('../module/user');
const Message = require('../module/message');
const async = require('async');
const jwt = require('jsonwebtoken');
const secret = process.env.secret;


module.exports =  io => {
    io.on('connection', socket => {


        // event login
        // get token and ckeck it
        // update socketId of thisUser
        // get all usersc
        // sent to thisUser his user opject
        // get all users and add online [true | false]
        // sent to all users to all users
        socket.on('login' , token  =>  { 
            jwt.verify( token , secret , (err , decode )=>{
                if(err){
                    socket.emit('error' ,  'error token on event login')
                }else{
                    async.waterfall([
                        cb => {
                            User.findByIdAndUpdate({_id : decode.user._id} , {socketId : socket.id} ,  {new: true})
                                .lean() // this is very import to change Property in mongoose 
                                .then( _user => {
                                    cb(null , _user)
                                })
                                .catch(err => {
                                    socket.emit('error' ,  'error DB update socketId on event login {findByIdAndUpdate}')
                                    cb(err)
                                })
                        },
                        (_user , cb ) => {
                            User.find({})
                                .lean() // this is very import to change Property in mongoose 
                                .then(users =>{
                                    var _users = [];
                                    for(let i = 0 ; i < users.length ;  i++){
                                        let user = Object.assign({}, users[i] ); // clone of opject {{fix js}}
                                        if(Object.keys(io.sockets.sockets).indexOf(user.socketId) > -1){
                                            user.online = true;
                                            _users.push(user);
                                        }else{
                                            user.online = false;
                                            _users.push(user);
                                        }
                                    }
                                    socket.emit('login' ,  {user : _user});
                                    io.emit('refresh' , {users:_users});
                                })
                                .catch(err => {
                                    socket.emit('error' ,  'error DB find Users on event login')
                                })
                        }
                    ]);

                };
            });
        })


        // start refresh
        // on disconnect any user
        // get all users from DB
        // set online true or false
        // set all users to all users
        socket.on('disconnect' , () => {   
            User.find({})
                .lean() // this is very import to change Property in mongoose 
                .then(users =>{
                    var _users = [];
                    for(let i = 0 ; i < users.length ;  i++){
                        let user = Object.assign({}, users[i] ); // clone of opject {{fix js}}
                        if(Object.keys(io.sockets.sockets).indexOf(user.socketId) > -1){
                            user.online = true;
                            _users.push(user);
                        }else{
                            user.online = false;
                            _users.push(user);
                        }
                    }
                    // emit all users to all users
                    io.emit('refresh' ,  {users:_users})
                })
                .catch(err => {
                    io.emit('error' ,  'error DB find Users on event disconnect')
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
                    let message = new Message({
                        content : msg.content,
                        user : msg.user._id,
                        caller : msg.caller._id
                    });
                    message.save()
                        .then(() => {
                            // console.log('save msg')
                        })
                        .catch( err => {
                            io.emit('error' ,  'error DB save msg on event msg')
                        })
                }
            ])
        })






    });
}