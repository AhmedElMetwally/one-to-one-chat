
const express = require('express');
const router = express.Router();
const User = require('../module/user');
const jwt = require('jsonwebtoken');
const Message = require('../module/message');
const secret = process.env.secret;


router.get('/messages' , function(req,res){

  let userId = req.query.userId;
  let callerId = req.query.callerId;

  // get all messages 
  // if user is user   , caller is caller
  // if user is caller , caller is user
  // replace caller and user with his doc
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
      // setTimeout(()=>{
        res.status(200).json(messages)
      // } , 3000)
    }).catch(err => {
      res.status(401).json();
    })
});


 
module.exports = router;
