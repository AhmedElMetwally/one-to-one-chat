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
 



router.get('/ckeckAuth' , function(req,res){
  jwt.verify(req.query.token , secret , function(err , decode){
    if(err){
      res.status(401).json({auth : false});
    }else{
      if(decode.user._id == req.query._id){
        res.status(200).json({auth : true})
      }else{
        res.status(401).json({auth : false});
      }
    }   
  })
})

 
module.exports = router;
