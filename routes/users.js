const express = require('express');
const router = express.Router();
const User = require('../module/user');
const jwt = require('jsonwebtoken');
const Message = require('../module/message');
const secret = process.env.secret;
const async = require('async');

const cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'hsdayit7q', 
  api_key: '778798688727479', 
  api_secret: 'ZnKI3T_IK89d2-sSY980QdVWqWg' 
});



// ckeck if token is good 
// run next function
// if token is bad stop here 
// sent status false
const ckeckToken = ( req , res , next ) => {
  jwt.verify(req.headers['token'] , secret , (err , decode) => {
    if(err){
        res.status(200).json({err : err , status : false});
    }else{
        next();
    };
  });
};



// get user from client
// save user
// create token
// sent token and _id
router.post('/signup', function(req, res, next){
  
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



// get user with email
// compare pasword
// get token
// sent token and _id
router.post('/signin' , function(req,res){
  
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
 


// get token and _id
// decode token
// find user with _id
// compare token _id with user in DB  
router.get('/ckeckAuth'  , function(req,res){

  async.waterfall([
    
    // decode this token
    cb => {
      jwt.verify(req.headers['token'] , secret , function(err , decode){
        cb(err , decode);
      });
    },

    // find user of his _id
    (decode , cb) =>{
      User.findById( req.headers['_id'] , (err , user)=>{
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


 
// get user with his data
router.get('/find' , ckeckToken , (req , res) => {
  let { _id } = req.query;
  User.findById(_id)
    .lean()
    .exec( (err , user) => {
      if(err){
        res.status(200).json({err : err , status: false });
      }else{
        user.password = '';
        res.status(200).json({user : user , status : !!user });
      };
    });
});



// get user with his _id
// update user
router.post('/update' , ckeckToken , (req , res) => {
  let { _id } = req.query;
  User.update({_id : _id} , req.body , (err , result) => {
    if(err){
      res.status(200).json({err : err ,status : false });
    }else{
      res.status(200).json({result : result ,status : true });
    };
  });
});



// if this user is in DB
// get  _id , token
// ----------------
// if this user not in DB
// register thisUser
// get  _id , token
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



// get token
// decode this token and cb user
// get img
// upload img and get his url
// cb user_id , url
// update image this user with _id  
// get thisUser
// sent it with status true
router.post('/image' , ckeckToken , (req , res) => {
  
  async.waterfall([
    
    
    // decode this token and cb user
    cb => {
      jwt.verify(req.headers['token'] , secret , (err , decode) => {
        cb(err , decode.user);
      });
    },


    // upload img and get his url
    // cb user_id , url
    (user , cb) => {
      let { _id } = user;
      let { image } = req.files;
      cloudinary.v2.uploader
        .upload_stream((err, result) => {
          cb(err , _id ,result.url);
        })
        .end(image.data);
    },


    // update image this user with _id  
    // get thisUser
    // cb user
    ( _id , url , cb ) => {
      User.findByIdAndUpdate({_id :  _id} , {image : url } ,  {new: true} , (err , user) => {
        cb(err , user);
      })
    }

    // if err status false
    // if not err status true 
  ], (err , user) => {
    if(err){
      res.status(200).json({status : false , err : err});
    }else{
      res.status(200).json({status : true , user : user});
    };
  });


});



module.exports = router;
