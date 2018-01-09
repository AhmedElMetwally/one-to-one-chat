const mongoose = require('mongoose');
const bcrypt     = require('bcrypt');
const Schema     = mongoose.Schema;

const UserSchema = new Schema({
    content : String,
    user : { type: Schema.Types.ObjectId, ref: 'user' } ,
    caller : { type: Schema.Types.ObjectId, ref: 'user' },
    created  : { type: Date, default: Date.now }
});

 
module.exports = mongoose.model('message' , UserSchema);
