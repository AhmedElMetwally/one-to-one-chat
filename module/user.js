const mongoose = require('mongoose');
const bcrypt     = require('bcrypt');
const Schema     = mongoose.Schema;

const UserSchema = new Schema({
    email : {type : String },
    name : String,
    password : String ,
    socketId : String
});

// convert password to hash
UserSchema.pre('save' , function(next){
    var user = this;
    if(!user.isModified('password'))
        return next()
    if(user.password)
        bcrypt.hash(user.password , 10)
            .then(hash=>{
                user.password = hash
                next()
            })
            .catch(err => next(err));    
});

// compare hash with password
UserSchema.methods.comparePassword = function(password){
    var user = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(password , user.password)
            .then(isMatch=>resolve(isMatch))
            .catch(err=>reject(err))
    })
};

 
module.exports = mongoose.model('user' , UserSchema);
