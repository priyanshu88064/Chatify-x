const requests = document.getElementById('requests');
const friends = document.getElementById('friends');

function populateRequests(arr){
    const n = arr.length;

    for(var i=0;i<n;i++){

        const a = document.createElement('a');
        a.href = "/chat/acceptRequest?name="+arr[i];

        const user = document.createElement('div');
        user.innerHTML = arr[i];
        
        a.appendChild(user);

        requests.appendChild(a);

    }

}

function populateFriends(arr){
    const n = arr.length;

    for(var i=0;i<n;i++){

        const a = document.createElement('a');
        a.href = "/chat/private?name="+arr[i];

        const user = document.createElement('div');
        user.innerHTML = arr[i];

        a.appendChild(user);
        
        friends.appendChild(a);
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
getRequests();
