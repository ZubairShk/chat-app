const socket = io('localhost:8000');

const form = document.getElementById('sendcont');
const messageinp = document.getElementById('messageinp');
const messagecontainer =document.querySelector('.chatbod');
var audio = new Audio('twitter_alert.mp3')

const append =(message,position)=>{
    const messageElement= document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
    if (position=='left'){
        audio.play()
    }
}


const name = prompt('Enter your name');

socket.emit('new-user-joined',name);

socket.on('user-jouned',name =>{
    append(`${name}:joined the chat`, 'right');
    
})
socket.on('receive',data =>{
    append(`${data.name}:${data.message}`, 'left');
    
})
socket.on('left',name =>{
    append(`${name}left the chat`, 'right');
    
})
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message= messageinp.value;
    append(`you: ${message}`, 'right');
    socket.emit('send',message);
    messageinp.value =''
})