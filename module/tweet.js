const mongoose = require('mongoose');
const bcrypt     = require('bcrypt');
const Schema     = mongoose.Schema;

const TweetSchema = new Schema({
    content : String,
    user    : { type: Schema.Types.ObjectId, ref: 'user' } ,
    created : { type: Date  }
});

 
module.exports = mongoose.model('tweet' , TweetSchema);
