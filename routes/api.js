const express = require('express');
const router = express.Router();
const User = require('../module/user');
const jwt = require('jsonwebtoken');
const Message = require('../module/message');
const Tweet = require('../module/tweet');
const secret = process.env.secret;



// ckeck if token is good 
// run next function
// if token is bad stop here 
// sent status false
const ckeckToken = ( req , res , next ) => {
  jwt.verify(req.headers['token'] , secret , (err , user) => {
    if(err){
        res.status(200).json({err : err , status : false});
    }else{
        next();
    };
  });
};


// get all messages 
// if user is user   , caller is caller
// if user is caller , caller is user
// replace caller and user with his doc
router.get('/messages' , ckeckToken ,function(req,res){
  let userId = req.query.userId;
  let callerId = req.query.callerId;
  Message.find({
    $or:[
      {user : userId , caller : callerId},
      {user : callerId , caller : userId}
    ]
    })
    .populate('user')
    .populate('caller')
    .exec((err , messages) => {
      if(err){
        res.status(200).json({status: false  , err : err})
      }else{
        res.status(200).json({status: true  , messages : messages})

      };
    });
});



// get all tweets
// replace user with his data
// sort from new to old
router.get('/tweets' , (req, res) => {
  Tweet.find({})
    .populate('user')
    .sort('-created')
    .exec((err , tweets) => {
      if(err){
        res.status(200).json({status: false  , err : err})
      }else{
        res.status(200).json({status: true  , tweets : tweets})
      }
    })
})
 


// var token = 'adsadasdsadasd';
// const mailjet = require ('node-mailjet')
//       .connect
//       (
//         'ed23af36557730759d32b85969939c64',
//         'eb56562cc0123ed80a0476ed965194b9'
//       )

//       mailjet
//       .post("send", {'version': 'v3.1'})
//       .request({
//         "Messages":[
//             {
//                 "From": {
//                     "Email": "carawanbaik77@gmail.com",
//                     "Name": "Admin"
//                 },
//                 "To": [
//                     {
//                         "Email": "carawanbaik77@gmail.com",
//                         "Name": ""
//                     }
//                 ],
//                 "Subject": "change your password in (one to one chat)",
//                 "HTMLPart": `
//                   <h1  align='center'> 
//                     Dear user, welcome to one to one chat 
//                     <br>
//                     pleace go to this link to change your password 
//                   <h1> 
//                   <br> 
//                   <h2 align='center'> 
//                     <a href='http://one-to-one-chat.herokuapp.com/user/forget-password/${token}'>
//                       click here
//                     </a>
//                   </h2> 
//                   `
//             }
//         ]
//       })
//       .then( e => console.log(e))



module.exports = router;
