const mongoose = require('mongoose');
const bcrypt     = require('bcrypt');
const Schema     = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


const UserSchema = new Schema({
    email : {type : String ,  lowercase:true ,  unique: true , required: true},
    name : {type : String , required: true   },
    password :{type : String   },
    socketId : {type : String   },
    image : {type : String , default : '/test/test'},
    facebook : {
        id : {type : String ,unique: true},
        token : {type : String , unique: true }
    }    

});

UserSchema.plugin(uniqueValidator);

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
UserSchema.methods.comparePassword = function(password  , callback ){
    var user = this;
    return bcrypt.compare(password , user.password , callback )
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



 
module.exports = mongoose.model('user' , UserSchema);
