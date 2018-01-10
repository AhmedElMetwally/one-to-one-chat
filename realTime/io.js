const User = require('../module/user');
const Message = require('../module/message');
const async = require('async');
const jwt = require('jsonwebtoken');
const secret = process.env.secret;


module.exports =  io => {
    io.on('connection', socket => {

        // on event login
        // get token
        // sent decode
        // update user socketId and sent Updated user
        // get all users
        // ckeck if any user online (true , false)
        // sent updated user to thisUser (event login)
        // sent all users(online : true , false) to all users (event refresh)
        // if any error emit event error to thisUser
        socket.on('login' , token  =>  { 
            async.waterfall([
                
                // token
                cb => {
                    jwt.verify( token , secret , (err , decode )=>{
                        cb(err , decode)
                    })
                },

                // update user socketId
                ( decode , cb ) => {
                    User.findByIdAndUpdate({_id : decode.user._id} , {socketId : socket.id} ,  {new: true})
                        .lean() // this is very import to change Property in mongoose 
                        .then( _user => {
                            cb(null , _user);
                        })
                        .catch(err => {
                            cb(err);
                        });
                },
                
                // get all users
                ( _user , cb ) => {
                    User.find({})
                        .lean() // this is very import to change Property in mongoose 
                        .then(users =>{
                            var _users = [];
                            for(let i = 0 ; i < users.length ;  i++){
                                if(Object.keys(io.sockets.sockets).indexOf(users[i].socketId) > -1){
                                    users[i].online = true;
                                    _users.push(users[i]);
                                }else{
                                    users[i].online = false;
                                    _users.push(users[i]);
                                };
                            };

                            // sent updated user to thisUser
                            socket.emit('login' ,  {user : _user});

                            // sent all updated users to all users
                            io.emit('refresh' , {users:_users});
                        })
                        .catch(err => {
                            cb(err)
                        });
                }

                // if cb(err) 
                // sent error to thisUser in _authService.SocketIO_error()
            ] , (err) => { 
                socket.emit('error' ,  {err : err , event : 'login'});
            });

        })




        
        // if any user disconnect
        // emit refresh event
        // sent all users(online: true , false) to all users
        // if any error  sent this error to thisUser
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
                    // sent updated user to thisUser
                    io.emit('refresh' ,  {users:_users})
                })
                .catch(err => {
                    socket.emit('error' ,  'error DB find Users on event disconnect')
                })
        })


        // on event msg
        // sent msg to caler.socketId
        // then save it in DB
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
                            socket.emit('error' ,  'error DB save msg on event msg')
                        })
                }
            ])
        })






    });
}