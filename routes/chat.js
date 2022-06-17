const router = require('express').Router();
const { authorization, findUser, getRequests, getFriends, acceptRequest, idsave, getSocketIdOfReciever, saveMessage, fetchMessages, removeSocket, rejectRequest, fetchLast } = require('../extras/databaseStuff');
const session = require('../server');
var randomRoomId = 41238;

io.on('connection',(socket)=>{
    console.log(socket.id);

    socket.on('send',(message)=>{
        socket.broadcast.emit('rec',message);
    });
    
    socket.on('public-send',(message)=>{
        socket.broadcast.emit('public-rec',message);
    });
    
    socket.on('sendRoom',(message,room)=>{
        socket.to(room).emit('recRoom',message);
    });

    socket.on('join',(room)=>{
        socket.join(room);
    });

    socket.on('idsave',(sender,reciever)=>{
        idsave(socket.id,sender,reciever);

        fetchMessages(sender,reciever).then((msgs)=>{

            for(var i=0;i<msgs.length;i++){

                var y = sender+"";
                y = y.toLowerCase();

                var x = msgs[i].sender+"";
                x = x.toLowerCase();

                if(x==y)
                    socket.emit('fetch',msgs[i],1);
                else socket.emit('fetch',msgs[i],0);
            }
        });
    });

    socket.on('private-send',(message,sender,reciever)=>{
        saveMessage(sender,reciever,message);
        
        getSocketIdOfReciever(sender,reciever).then(id=>{
            if(id)socket.to(id).emit('private-rec',message);
        });

    });

    socket.on('disconnect',()=>{
        removeSocket(socket.id);
    });

});

router.get('/',authorization,(req,res)=>{
    res.render("frontend/html/public_chat.ejs");
});

router.get('/create-room',authorization,(req,res)=>{
    randomRoomId++;
    res.render('frontend/html/custom-roomR.ejs',{room:randomRoomId});
});
router.get('/join',authorization,(req,res)=>{
    const room = req.query.roomId;
    res.render('frontend/html/custom-roomR.ejs',{room:room});
});

router.get('/find',authorization,(req,res)=>{

    console.log(req.query.username);

    findUser(req.query.username,req.session.username).then(data=>{
        res.send(data);
    });
});

router.get('/requests',authorization,(req,res)=>{
    getRequests(req.session.username).then(data=>{
        res.json(data);
    });
});

router.get('/friends',authorization,(req,res)=>{
    getFriends(req.session.username).then(data=>{
        res.json(data);
    });
});

router.get('/acceptRequest',authorization,(req,res)=>{
    acceptRequest(req.session.username,req.query.name).then(()=>{
        res.redirect('/requests');
    })
});
router.get('/rejectRequest',authorization,(req,res)=>{
    rejectRequest(req.session.username,req.query.name).then(()=>{
        res.redirect('/requests');
    })
});

router.get('/private',authorization,(req,res)=>{
    res.render('frontend/html/chat_page.ejs',{username:req.session.username});
});

router.post('/fetchLast',authorization,(req,res)=>{
    const {reciever } = req.body;
    fetchLast(req.session.username,reciever).then(data=>{
        res.json(data);
    })
});

module.exports = router;    