const express = require('express');
const router = express.Router();
const User = require('../module/user');
const jwt = require('jsonwebtoken');
const Message = require('../module/message');
const secret = process.env.secret;

// sign up
router.post('/signup', function(req, res, next){
 
  // get user from client
  // save user
  // create token
  // sent token and _id

  var user = new User(req.body);
  user.save()
    .then(_user => {
      jwt.sign({user : _user} , secret , { expiresIn: '24h' } , function(err , token){
        if(err){
          res.status(401).json();
        }else{
          res.status(200).json({
            token : token , 
            _id : _user._id
          })
        }
      })
    })
});

// singin
router.post('/signin' , function(req,res){
  
  // get user with email
  // compare pasword
  // get token
  // sent token and _id
  
  User.findOne({email : req.body.email})
    .then( user => {
        user.comparePassword( req.body.password )
          .then( isMatch => {
            if(isMatch){
              jwt.sign({user : user} , secret , { expiresIn: '24h' } , function(err , token){
                res.status(200).json({
                  token : token , 
                  _id : user._id
                })
              })
            }
          })
          .catch(err => {
            res.status(401).json();
          })
    })
});

// get messages
router.get('/messages' , function(req,res){
  
  // get userid and callerid
  var userId = req.query.userId;
  var callerId = req.query.callerId;

  // get all messages 
  // if user is user   , caller is caller
  // if user is caller , caller is user
  // replace callerid and user id with his document
  Message.find({
    $or:[
      {user : userId , caller : callerId},
      {user : callerId , caller : userId}
    ]
    })
    .populate('user')
    .populate('caller')
    .exec()
    .then( messages =>{
      res.status(200).json(messages)
    }).catch(err => {
      res.status(401).json();
    })
});

// check if user in in DB
// ckeck if this token is good
router.get('/ckeckAuth' , function(req,res){
  User.findOne({ _id :req.query._id})
    .then(user =>{
      if(user){
        jwt.verify(req.query.token , secret , function(err , decode){
          if(err){
            // token is not good
            res.status(401).json({auth : false});
          }else{
            // _id and token is good
            res.status(200).json({auth : true})
          }   
        })
      }else{
        // user not in DB
        res.status(401).json({auth : false});
      }
    })
    .catch(err =>{
      // user not in DB
      res.status(401).json({auth : false})
    })
})

 
module.exports = router;
