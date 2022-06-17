var mongoose = require('mongoose');
var {userModel,messageModel,socketModel} = require('./schema');

mongoose.connect('mongodb+srv://priyanshu88064:9758809708@cluster0.aqv81fc.mongodb.net/?retryWrites=true&w=majority');
// mongoose.connect('mongodb://localhost:27017/chatify');

async function authentication(req,res,next){
    var {username,password} = req.body;

    username = username.toLowerCase();
    password = password.toLowerCase();

    try{

        var user = await userModel.findOne({username:username,password:password});
        if(!user) return res.send("Username/Password is incorrect");

        next();

    }catch(err){
        console.log(err);
        return res.send("Some Error Occured");
    }

    next();
}

function authorization(req,res,next){
    if(req.session.isAuth==undefined || req.session.isAuth==false)
         return res.render('frontend/html/login.ejs');
         
    next();
}

async function createUser(req,res,next){

    var {username,password} = req.body;

    username = username.toLowerCase();
    password = password.toLowerCase();

    var user = await userModel.findOne({username:username});
    if(user) return res.send("User already Exist");

    const requests = ['peter','sam'];

    try{

        var user = new userModel({
            username,password,
            requests
        });

        await user.save();

        next();

    }catch(err){
        console.log(err);
        return res.send("some error Occured");
    }

}

async function findUser(u,p){

    var username = u+"";
    var cur_user = p+"";
    username = username.toLowerCase();
    cur_user = cur_user.toLowerCase();

    var user = await userModel.findOne({username:username});
    if(!user) return "User Not Found";
    
    
    userModel.findOneAndUpdate(
        {username:username},
        {$addToSet:{requests:cur_user}},
        (err,success)=>{
            if(err)console.log("");
            else console.log("");
        }
    );
        
    // console.log(userModel.findOne({username:username}));
    
   return "User Found";
}

async function getRequests(u){

    var username = u+"";
    username = username.toLowerCase();

    var user = await userModel.findOne({username:username});

    return user.requests;

}

async function getFriends(u){
    var username = u+"";
    console.log(username);
    username = username.toLowerCase();

    var user = await userModel.findOne({username:username});

    return user.friends;
}

async function acceptRequest(u,p){

    var user = u+"";
    user = user.toLowerCase();
    var friend = p+"";
    friend = friend.toLowerCase();

    userModel.findOneAndUpdate(
        {username:user},
        {$addToSet:{friends:friend}},
        (err,success)=>{
            if(err)console.log("");
            else console.log("");
        }
    );
    userModel.findOneAndUpdate(
        {username:user},
        {$pull:{requests:friend}},
        (err,success)=>{
            if(err)console.log("");
            else console.log("");
        }
    );
    userModel.findOneAndUpdate(
        {username:friend},
        {$addToSet:{friends:user}},
        (err,success)=>{
            if(err)console.log("");
            else console.log("");
        }
    );
}

async function rejectRequest(u,p){

    var user = u+"";
    user = user.toLowerCase();
    var friend = p+"";
    friend = friend.toLowerCase();

    userModel.findOneAndUpdate(
        {username:user},
        {$pull:{requests:friend}},
        (err,success)=>{
            if(err)console.log("");
            else console.log("");
        }
    );
}

async function idsave(socketid,u,p){

    var sender = u+"";
    sender = sender.toLowerCase();
    var reciever = p+"";
    reciever = reciever.toLowerCase();
    
    
    var res = new socketModel({
        sid:socketid,
        from:sender,
        to:reciever
    });

    await res.save();
}

async function getSocketIdOfReciever(u,p){

    var sender = u+"";
    sender = sender.toLowerCase();
    var reciever = p+"";
    reciever = reciever.toLowerCase();

    var doc = await socketModel.findOne(
        {from:reciever,to:sender}
    );
    if(doc)return doc.sid;
    else return 0;
}

async function saveMessage(u,p,message){
    var sender = u+"";
    sender = sender.toLowerCase();
    var reciever = p+"";
    reciever = reciever.toLowerCase();

    var msg = new messageModel({
        message,
        users:[sender,reciever],
        sender,
        date:new Date()
    });

    await msg.save();
}

async function fetchMessages(u,p){

    var sender = u+"";
    sender = sender.toLowerCase();
    var reciever = p+"";
    reciever = reciever.toLowerCase();

    var msgs = await messageModel.find(
        {users:{$all:[sender,reciever]}}
    ).sort({date:1});

    return msgs;
}

async function fetchLast(u,p){

    var sender = u+"";
    sender = sender.toLowerCase();
    var reciever = p+"";
    reciever = reciever.toLowerCase();

    var last = await messageModel.find(
        {users:{$all:[sender,reciever]}}
    ).sort({date:-1}).limit(1);
    
    return last;
}

async function removeSocket(sid){
    socketModel.deleteOne({sid},(err)=>{
        if(err)console.log(err);
    });
}

module.exports = {
    authentication,
    authorization,
    createUser,
    findUser,
    getRequests,
    getFriends,
    acceptRequest,
    rejectRequest,
    idsave,
    getSocketIdOfReciever,
    getSocketIdOfReciever,
    saveMessage,
    fetchMessages,
    removeSocket,
    fetchLast
};


