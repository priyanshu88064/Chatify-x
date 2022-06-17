const socket = io();
const send = document.getElementById('send');
const msg = document.getElementById('msg');
const chatarea = document.getElementById('chatarea');
const x_name = document.getElementById('x_name');

//sockets--------------------------------------------------------------------------------------------------------
socket.emit('join',room);

socket.on('connect',()=>{
    displayright("This is Custom Room "+room);
});
socket.on('public-rec',(message)=>{
    displayleft(message);
});
socket.on('recRoom',(message)=>{
    displayleft(message);
});

//--------------------------------------------------------------------------------------------------------------

function findMessage(message){
    if(typeof message =='string') return message;
    else return message['message'];
}
function findTime(message){
    var date = new Date();
    
    if(typeof message == 'object'){
        date = new Date(message['date']);
    }

    var time = "";
    time+=date.getHours()%12;
    time+=":";

    if(date.getMinutes()<10)time+="0"+date.getMinutes();
    else time+=date.getMinutes();

    if(date.getHours()>=12)time+="pm";
    else time+="am";

    return time;
}
function displayleft(message){
    const div = document.createElement('div'); // Parent
    div.setAttribute('id','leftMessage');

    const userImage = document.createElement('div'); // Child 1
    userImage.classList.add('userImage');

    const userImg = document.createElement('img');
    userImg.src='../1539986471.svg';
    userImg.alt='User';

    userImage.append(userImg);

    const content = document.createElement('div'); // Child 2
    content.classList.add('content');
    
    const crhead = document.createElement('div'); // Child2 > Child1
    crhead.classList.add('crhead');

    const crtime = document.createElement('span'); // Child2 > Child1 > Child1
    crtime.classList.add('crtime');
    crtime.innerHTML = findTime(message);

    const crname = document.createElement('span'); // Child2 > Child1 > Child2
    crname.classList.add('crname');
    crname.innerHTML = "ToDo";

    crhead.append(crtime,crname);

    const mesg = document.createElement('div'); // Child2 > Child2
    mesg.classList.add('mesg');
    mesg.innerHTML=findMessage(message);

    content.append(crhead,mesg);

    div.append(userImage,content);
    
    chatarea.insertBefore(div,chatarea.children[0]);
}
function displayright(message){
    
    const div = document.createElement('div'); // Parent
    div.setAttribute('id','rightMessage');

    const userImage = document.createElement('div'); // Child 1
    userImage.classList.add('userImage');

    const userImg = document.createElement('img');
    userImg.src='../1539986471.svg';
    userImg.alt='User';

    userImage.append(userImg);

    const content = document.createElement('div'); // Child 2
    content.classList.add('content');
    
    const chead = document.createElement('div');
    chead.classList.add('chead');
    chead.innerHTML=findTime(message);

    const mesg = document.createElement('div');
    mesg.classList.add('mesg');
    mesg.innerHTML=findMessage(message);

    content.append(chead,mesg);

    div.append(userImage,content);
    
    chatarea.insertBefore(div,chatarea.children[0]);
}
function msgfunction(){
    if(msg.value=="")return;

    socket.emit('sendRoom',msg.value,room);

    displayright(msg.value);
    msg.value="";
}
function enterToSend(e){
    if(e.key=='Enter')msgfunction();
}
send.addEventListener('click',msgfunction);
msg.addEventListener('keydown',enterToSend);