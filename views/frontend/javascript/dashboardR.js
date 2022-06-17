const hover  = document.getElementById('hover');
const addfriend = document.getElementById('addfriend');
const createroom = document.getElementById('createroom');
const joinroom = document.getElementById('joinroom');
const box = document.getElementById('box');
const chatbox = document.getElementById('chatbox');
const inputFriendsName = document.getElementById('inputFriendsName');
const inputJoinRoom = document.getElementById('inputJoinRoom');
const inp = document.getElementById('search');
const searchImg = document.getElementById('searchImg');
var ifHover = 0,ifSearch=0;


hover.addEventListener('click',()=>{

        inputFriendsName.style.display='none';
        inputJoinRoom.style.display='none';
        inputFriendsName.style.bottom='200px';
        inputJoinRoom.style.bottom='200px';

        if(ifHover){

            joinroom.style.bottom='80px';
            addfriend.style.bottom='80px';
            createroom.style.bottom='80px';

            setTimeout(() => {
                addfriend.style.display='none';
                createroom.style.display='none';
                joinroom.style.display='none';
            }, 100);

        }
        else{
                addfriend.style.display='block';
                createroom.style.display='block';
                joinroom.style.display='block';    
                
                
                setTimeout(() => {
                    addfriend.style.bottom='250px';
                    createroom.style.bottom='190px';
                    joinroom.style.bottom='130px';
                }, 10);
        }

    ifHover = ifHover^1;
});

addfriend.addEventListener('click',()=>{

        document.getElementById('cancel').addEventListener('click',()=>{
            inputFriendsName.style.display='none';
            inputFriendsName.style.bottom='200px';
        });

        joinroom.style.bottom='80px';
        addfriend.style.bottom='80px';
        createroom.style.bottom='80px';

        setTimeout(() => {
            addfriend.style.display='none';
            createroom.style.display='none';
            joinroom.style.display='none';
        }, 100);

        ifHover=ifHover^=1;

        setTimeout(() => {
            inputFriendsName.style.display='block';
        }, 50);

        setTimeout(() => {
                inputFriendsName.style.bottom='150px';
        }, 100); 
});

joinroom.addEventListener('click',()=>{
    document.getElementById('cancelx').addEventListener('click',()=>{
        inputJoinRoom.style.display='none';
        inputJoinRoom.style.bottom='200px';
    });

    ifHover=ifHover^=1;

    joinroom.style.bottom='80px';
    addfriend.style.bottom='80px';
    createroom.style.bottom='80px';

    setTimeout(() => {
        addfriend.style.display='none';
        createroom.style.display='none';
        joinroom.style.display='none';
    }, 100);

    setTimeout(() => {
        inputJoinRoom.style.display='block';
    }, 50);

    setTimeout(() => {
        inputJoinRoom.style.bottom='150px';
    }, 100); 


});

inp.addEventListener('keyup',()=>{
    var elements = chatbox.getElementsByTagName('a');
    var filter=inp.value+"";
    filter=filter.toUpperCase();

    // console.log(elements[0].getElementsByTagName('div')[0].getElementsByTagName('div')[0].innerHTML);

    for(var i=0;i<elements.length;i++){
        var comp = elements[i].getElementsByTagName('div')[0].getElementsByTagName('div')[0].innerHTML+"";
        if(comp.toUpperCase().indexOf(filter) > -1) elements[i].style.display="";
        else elements[i].style.display="none";
    }
});

searchImg.addEventListener('click',()=>{
    if(ifSearch){

        inp.style.display='none';
        ifSearch=ifSearch^1;
    }else{
        inp.style.display="";
        inp.focus();

        ifSearch=ifSearch^1;
    }
})

async function populateFriends(arr){
    const n = arr.length;

    for(var i=0;i<n;i++){

        const reciever = arr[i];

        const a = document.createElement('a');
        a.href = "/chat/private?name="+arr[i];

        const div = document.createElement('div');
        div.classList.add('user');

        const img = document.createElement('img');
        img.src='1539986471.svg';
        img.alt='User Profile';

        const username = document.createElement('div');
        username.classList.add('username');
        username.innerHTML= arr[i];

        const lastmsg = document.createElement('div');
        lastmsg.classList.add('lastmsg');

        const time = document.createElement('div');
        time.classList.add('time');

        await fetch('/chat/fetchLast',{
           method:'post',
           headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                reciever
            }),
        }).then(function(data){
            return data.json();
        }).then(function(data){
            if(data[0]!=undefined){
                var lst = data[0]['message']+"";
                lst=lst.substring(0,40);
                if(data[0]['message'].length>40) lst+="....";

                lastmsg.innerHTML=lst;
                
                var date = new Date(data[0]['date']);
                var tim = date.getHours()%12+":"+date.getMinutes();
                if(date.getHours()>=12)tim+="pm";
                else tim+="am";

                time.innerHTML=tim;
            }
        });

        div.append(img,username,lastmsg,time);
        a.append(div);
        chatbox.append(a);
    }
}

async function getFriends(){
    const response = await fetch('/chat/friends',{
        method:'get',
        headers:{
            'Content-Type':'application/json'
        }
    }).then(function(data){
        return data.json();
    }).then(function(data){
        return data;
    });

    populateFriends(response);
}

getFriends();