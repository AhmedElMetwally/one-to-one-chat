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
      User.create(req.body , (err , user) => {
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
        // console.log(err);
        res.status(200).json({ err : err , status : false});
      }else{
        res.status(200).json({
          status : true,
          user : {
            _id : user._id ,
            token : token 
          }
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
        if(user){
          cb(err , user);
        }else{
          cb('this user is not in DB'); 
        };
      });
    },
    
    // compare password
    (user , cb ) => {
      user.comparePassword( req.body.password , (err , isMatch)=>{
        cb(err , user , isMatch)
      });
    },
    
    // create token
    (user , isMatch , cb) => {
      if(isMatch){
        jwt.sign({user : user} , secret , { expiresIn: '24h' } , function(err , token){
          cb(err , user , token);
        });
      }else{
        cb('Error in Token');
      };
    }
    
    // get error if err
    // get result
    ], (err , user , token) => {
      if(err){
        console.log(err);
        res.status(200).json({ err : err , status : false});
      }else{
        res.status(200).json({
          status : true,
          user : {
            _id : user._id ,
            token : token 
          }
        })
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
        if(user){
          cb(err , user , decode );
        }else{
          cb('this user is not in DB' ); 
        }
      });

    }

    // get err if err 
    // get all result
    // compare  token _id with user _id 
    ], (err , user , decode) => {
      if(err){
        // console.log(err)
        res.status(200).json({ err : err , status : false});
      }else{
        res.status(200).json({status : user._id == decode.user._id  })
      };
    });

});

 

router.get('/find' , (req , res) => {
  // get user with his data

  let { _id } = req.query;
  User.findById(_id)
    .lean()
    .then(user => {
      if(user){
        user.password = '';
        res.status(200).json({user : user});
      }else{
        res.status(401).json('Not Found');
      }
    })
    .catch(err => {
      res.status(401).json(err);
    });
});



router.post('/facebookSigninOrSignup' , (req , res) => {

  async.waterfall([

    // find user with condition
    // if not find
    // create with document 
    // ----------------------
    // find user with facebook id 
    // if not find 
    // create with req.body data 
    cb => {
      User.findOneOrCreate( {'facebook.id' : req.body.facebook.id } , req.body , (err , user) => {
        cb(err , user)
      })

    },


    // after save user
    // get token
    (user , cb) => {
      jwt.sign({user : user} , secret , { expiresIn: '24h' } , function(err , token){
        cb(err , user ,token);
      });
    }


    // if err
    // sent err
    // else sent token and _id to login
  ] , (err , user , token) => {
    if(err){
      res.status(401).json(err);
    }else{
      res.status(200).json({
        token : token , 
        _id : user._id
      });
    };
  })

  
});



module.exports = router;
