const mongoose = require('mongoose');
const bcrypt     = require('bcrypt');
const Schema     = mongoose.Schema;
const async = require('async');


const UserSchema = new Schema({
    email    : { type : String ,  lowercase:true , unique: true , index : true},
    name     : { type : String  },
    password : { type : String   },
    socketId : { type : String   },
    image    : { type : String , default: '../assets/noImage.jpg'},
    phone    : { type : String},
    facebookAccount : { type : String},
    facebook : {
        id    : String,
        token : String
    }    

});


// convert password to hash
UserSchema.pre('save' , function(next){
    var user = this;
    if(!user.isModified('password'))
        return next()
    if(user.password)
        bcrypt.hash(user.password , 10)
            .then(hash => {
                user.password = hash
                next()
            })
            .catch(err => next(err));    
});


// compare hash with password
UserSchema.methods.comparePassword = function(password  , callback ){
    return bcrypt.compare(password , this.password , callback )
};


// findOne Or Create
// find with condition
// if not find
// create with doc
UserSchema.statics.findOneOrCreate = function findOneOrCreate( condition ,doc, callback) {
    const self = this;
    self.findOne(condition, (err, result) => {
        return result 
        ? callback(err, result)
        : self.create(doc, (err, result) => {
            return callback(err, result);
        });
    });
};




// get _id
// get new Password
// convert new password to hash
// update password of user by _id
// return err , user in callback 
UserSchema.statics.changePassword = function changePassword( _id ,newPassword, callback) {
    const self = this;

    async.waterfall([
        cb => {
            bcrypt.hash(newPassword , 10 , (err , hash) => {
                cb(err , hash);
            })
        },

        (hash , cb) => {
            self.findOneAndUpdate({_id : _id} , {password : hash} , {new : true} , (err , user) => {
                cb(err , user);
            })
        }
    ] , (err  , user) => {
        callback(err , user)
    })
};


 
module.exports = mongoose.model('user' , UserSchema);



