const mongoose = require('mongoose');
const bcrypt     = require('bcrypt');
const Schema     = mongoose.Schema;

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



 
module.exports = mongoose.model('user' , UserSchema);

// module.exports.CkeckEmail = function(email){
//     return new Promise( (resolve , reject)=>{
//         UserSchema.findOne({email : email})
//             .then( doc => {
//                 res
//             })
//     })
// }
