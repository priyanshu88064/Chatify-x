
const socket  = io();
const box = document.getElementById("boxx");
const msg_submit = document.getElementById("msg-submit");
const msg = document.getElementById("msg");
const file_send = document.getElementById('file-send');
const myfile = document.getElementById('myfile');

function displayright(message){
    
    const right = document.createElement('div');
    right.classList.add('right-msg');
    right.style.marginRight='200px';

    var date = new Date();
    var ampm;
    if(date.getHours()<13) ampm = "AM";
    else ampm = "PM";
    const up = document.createElement('div');
    up.innerHTML ="--You  "+ date.getHours()%12 +":"+date.getMinutes()+' '+ampm+'--';
    up.classList.add('up');

    const down = document.createElement('div');
    down.innerHTML=message;
    down.classList.add('downmessage');

    right.appendChild(up);
    right.appendChild(down);

    box.insertBefore(right,box.children[0]);

    setTimeout(() => {
        right.style.marginRight='0';
        
    }, 100);
}

function fetchRight(message){
    const right = document.createElement('div');
    right.classList.add('right-msg');
    right.style.marginRight='200px';

    var date = new Date();
    var ampm;
    if(date.getHours()<13) ampm = "AM";
    else ampm = "PM";
    const up = document.createElement('div');
    up.innerHTML ="--You  "+ date.getHours()%12 +":"+date.getMinutes()+' '+ampm+'--';
    up.classList.add('up');

    const down = document.createElement('div');
    down.innerHTML=message;
    down.classList.add('downmessage');
    right.style.marginRight='0';

    right.appendChild(up);
    right.appendChild(down);

    box.appendChild(right);
}

// function displayrightimage(file){

//     const imgg = document.createElement('img');
//     imgg.classList.add('msg-image');
//     imgg.classList.add('right-msg');
//     imgg.src = URL.createObjectURL(file);

//     box.insertBefore(imgg,box.children[0]);

// }

function displayleft(message){
    const left = document.createElement('div');
    left.classList.add('left-msg');
    left.style.marginLeft='200px';

    var date = new Date();
    var ampm;   
    if(date.getHours()<13) ampm = "AM";
    else ampm = "PM";
    const up = document.createElement('div');
    up.innerHTML ="--Rohan  "+ date.getHours()%12 +":"+date.getMinutes()+' '+ampm+'--';
    up.classList.add('up');

    const down = document.createElement('div');
    down.innerHTML=message;
    down.classList.add('downmessage');

    left.appendChild(up);
    left.appendChild(down);

    box.insertBefore(left,box.children[0]);

    setTimeout(() => {
        left.style.marginLeft='0';
        
    }, 100);
}

function fetchLeft(message){
    const left = document.createElement('div');
    left.classList.add('left-msg');
    left.style.marginRight='200px';

    var date = new Date();
    var ampm;
    if(date.getHours()<13) ampm = "AM";
    else ampm = "PM";
    const up = document.createElement('div');
    up.innerHTML ="--You  "+ date.getHours()%12 +":"+date.getMinutes()+' '+ampm+'--';
    up.classList.add('up');

    const down = document.createElement('div');
    down.innerHTML=message;
    down.classList.add('downmessage');

    left.appendChild(up);
    left.appendChild(down);

    box.appendChild(left);
}

// function displayleftimage(filedata){

//     console.log(filedata);

//     const imgg = document.createElement('img');
//     imgg.classList.add('msg-image');
//     imgg.classList.add('left-msg');

//     imgg.src = URL.createObjectURL(
//         new Blob([filedata.buffer],{type:'image/png'})
//     );

//     box.insertBefore(imgg,box.children[0]);
// }

const params = new URLSearchParams(window.location.search);

function msgfunction(){
    
    if(msg.value=="")return;

    socket.emit('private-send',msg.value,myName,params.get('name'));
    
    displayright(msg.value);
    msg.value="";
}

function lodu(e){
    if(e.key=='Enter')msgfunction();
}
function lodu2(e){
    if(e.key=='Shift'){
        msg.focus();
    }
}

//Sockets-------------------------------------------------------------------

socket.on('connect',()=>{
    //TO-DO When Connect   
    // console.log(socket.id);
});

socket.on('private-rec',(message)=>{
    displayleft(message);
});

socket.emit('idsave',myName,params.get('name'));

socket.on('fetch',(message,me)=>{
    if(me) displayright(message);
    else displayleft(message);
});


// var file_name;

// function readfile(e){
//     const file = myfile.files[0];
//     file_name = myfile.value.split("\\")[2];

//     var stream = ss.createStream();
//     ss(socket).emit('file',stream,file_name);
    
//     var blob = ss.createBlobReadStream(file);
//     var size=0;
    
//     displayrightimage(file);

//     blob.on('data',(chunk)=>{
//         size+=chunk.length;
//         // right.innerHTML="File Send " + Math.floor(size/file.size * 100)+'%';
//     });
    
//     blob.pipe(stream);

//     setTimeout(() => {
//         socket.emit('get-file',file_name);
//     }, 1000);

// }

// socket.on('send-file-signal',(filename)=>{
//     socket.emit('sss-file',filename);
// })

// ss(socket).on('rrr',(stream)=>{

//     console.log(stream);

//     var filedata = [];
//     var len=0;

//     stream.on('data',(chunks)=>{
//         len+=chunks.length;
//         filedata.push(chunks);
//     });

    
//     stream.on('end',(data)=>{
//         var merge = new Uint8Array(len);
//         var offset = 0;
    
//         filedata.forEach(item=>{
//             merge.set(item,offset);
//             offset+=item.length;
//         });
        
//         console.log(2);

//         displayleftimage(merge);
//     });
    
// });


// myfile.addEventListener('change',readfile);

// file_send.addEventListener('click',()=>{myfile.click()});

msg_submit.addEventListener('click',msgfunction);
msg.addEventListener('keydown',lodu);
document.addEventListener('keydown',lodu2);
