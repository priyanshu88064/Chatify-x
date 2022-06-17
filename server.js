const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);      //->listen on this server for Socket.io
const {Server} = require('socket.io');
var io;
global.io = new Server(server);
const port = process.env.PORT || 80;

//intialize------------------------------------------------------------------------------------------
app.set('view engine','ejs');
app.set('socketio',io);
app.use(express.static('./views/frontend'));
app.use(express.static('./views/frontend/files'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//session----------------------------------------------------------------------------------------------
const session = require('express-session');
const path = require('path');
const MongoDbStore = require('connect-mongodb-session')(session);

var store = new MongoDbStore({
    uri:'mongodb+srv://priyanshu88064:9758809708@cluster0.aqv81fc.mongodb.net/?retryWrites=true&w=majority',
    // uri:'mongodb://localhost:27017/chatify',
    collection:'session'
});

app.use(session({
    secret:"secretKey",
    resave:false,
    saveUninitialized:false,
    store:store
}));

//Routes-----------------------------------------------------------------------------------------------
app.use('/',require('./routes/mainRoute'));
app.use('/dashboard',require('./routes/dashboardRoute'));
app.use('/chat',require('./routes/chat'));

server.listen(port,()=>console.log("Server Started"));

//Exports----------------------------------------------------------------------------------------------
module.exports=session;