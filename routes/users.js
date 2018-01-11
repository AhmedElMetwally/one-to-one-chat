const express = require('express');
const router = express.Router();
const User = require('../module/user');
const jwt = require('jsonwebtoken');
const Message = require('../module/message');
const secret = process.env.secret;
const async = require('async');

// sign up
router.post('/signup', function(req, res, next){
  
  // get user from client
  // save user
  // create token
  // sent token and _id
  async.waterfall([

    // save new user
    cb => {
      var user = new User(req.body);
        user.save( (err , user) => {
          cb(err , user);
        });
    },

    // create token
    (user , cb) => {
      jwt.sign({user : user} , secret , { expiresIn: '24h' } , function(err , token){
        cb(err , user ,token);
      });
    }

    // get err if err
    // get result 
    ], (err , user , token) => {
      if(err){
        res.status(401).json();
      }else{
        res.status(200).json({
          token : token , 
          _id : user._id
        })
      }
  });


});






// singin
router.post('/signin' , function(req,res){
  
  // get user with email
  // compare pasword
  // get token
  // sent token and _id
  async.waterfall([
  
    // find user by email
    cb => {
      User.findOne({email : req.body.email} , (err , user) => {
          cb(err , user);
      });
    },
    
    // compare password
    (user , cb ) => {
      if(user){ 
        user.comparePassword( req.body.password , (err , isMatch)=>{
          cb(err , user , isMatch)
        });
      }else{
        cb(new Error('User Not Found By Email'))
      };
    },
    
    // create token
    (user , isMatch , cb) => {
      if(isMatch){
        jwt.sign({user : user} , secret , { expiresIn: '24h' } , function(err , token){
          cb(err , user , token);
        });
      }else{
        cb(new Error('Error in Token'));
      };
    }
    
    // get error if err
    // get result
    ], (err , user , token) => {
      if(err){
        res.status(401).json();
      }else{
        res.status(200).json({
          token : token , 
          _id : user._id
        });
      }
  }); 
 
});
 



router.get('/ckeckAuth' , function(req,res){

  // get token and _id
  // decode token
  // find user with _id
  // compare token _id with user in DB  

  async.waterfall([
    
    // decode this token
    cb => {
      jwt.verify(req.query.token , secret , function(err , decode){
        cb(err , decode);
      });
    },

    // find user of his _id
    (decode , cb) =>{
      User.findById( req.query._id , (err , user)=>{
        cb(err , user , decode );
      });

    }

    // get err if err 
    // get all result
    // compare  token _id with user _id 
    ], (err , user , decode) => {
      if(err || user._id != decode.user._id ){
        res.status(200).json({auth : false});
      }else{
        res.status(200).json({auth : true});
      };
    });

});

 
module.exports = router;
