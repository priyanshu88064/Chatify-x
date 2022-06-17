const chatbox = document.getElementById('chatbox');

function populateRequests(arr){
    for(var i=0;i<arr.length;i++){

        const div = document.createElement('div');
        div.classList.add('friends');

        const img = document.createElement('img');
        img.src="1539986471.svg";
        img.alt='User';

        const username = document.createElement('div');
        username.classList.add('username');
        username.innerHTML=arr[i];

        const recieved = document.createElement('div');
        recieved.classList.add('recieved');
        recieved.innerHTML = 'Recieved : 12:00am';

        const acceptForm = document.createElement('form');
        acceptForm.method='get';
        acceptForm.action='/chat/acceptRequest';

        const rejectForm = document.createElement('form');
        rejectForm.method='get';
        rejectForm.action='/chat/rejectRequest';

        const inputQuery = document.createElement('input');
        inputQuery.name='name';
        inputQuery.style.display='none';
        inputQuery.value=arr[i];
        const inputQuery1 = document.createElement('input');
        inputQuery1.name='name';
        inputQuery1.style.display='none';
        inputQuery1.value=arr[i];

        const accept = document.createElement('button');
        accept.setAttribute('id','accept');
        accept.innerHTML='Accept';
        accept.type='submit';
        
        const reject = document.createElement('button');
        reject.setAttribute('id','reject');
        reject.innerHTML='Reject';
        reject.type='submit';

        acceptForm.append(inputQuery,accept);
        rejectForm.append(inputQuery1,reject);

        div.append(img,username,recieved,acceptForm,rejectForm);
        chatbox.append(div);

    }
}

async function getRequests(){
    
    const response = await fetch('/chat/requests',{
        method:'get',
        headers:{
            'Content-Type':'application/json'
        }

    }).then(function(data){
        return data.json();
    }).then(function(data){
        return data;
    });

    populateRequests(response);
}

getRequests();