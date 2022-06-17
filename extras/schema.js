const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },

    friends:[String],
    requests:[String],
    lastmsg:String,
    lasttime:Date
    
});

const socketSchema = new mongoose.Schema({
    sid:{type:String,required:true},
    from:{type:String,required:true},
    to:{type:String,required:true}
});

const MessageSchema = new mongoose.Schema({
    message:{type:String,required:true},
    users:{type:[String],required:true},
    sender:{type:String,required:true},
    date:{type:Date,required:true}
});

const userModel = new mongoose.model('login-db',userSchema);
const messageModel = new mongoose.model('Message',MessageSchema);
const socketModel = new mongoose.model('SocketIds',socketSchema); 

module.exports = {userModel,messageModel,socketModel};