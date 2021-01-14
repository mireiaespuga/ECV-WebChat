//import * as utils from './utils.js'

class Conversation {
    chat = null

}

class Chat {
    user = null
    startDate = null 
    text = 'this is a preview text that is very interesting once you read it'
}

class User {
    userName = null
    id = null
    pic =  null
}


var midnight = new Date();
midnight.setHours(24,0,0,0); 

var now = new Date();
var msToMidnight = midnight - now;

midnightTask();

var conversations = []

for (let index = 0; index < 5; index++) {
    var user = new User() ;
    user.userName = "Friend";
    var chat = new Chat();
    chat.user = user;
    chat.startDate = new Date();

    conversations.push(chat)
}

showConversations();


var b = document.querySelector("#send_button");
b.addEventListener("click", sendMessage);

var c = document.querySelector("#conver");
c.addEventListener("click", loadMessages);


setTimeout(
    midnightTask,
    msToMidnight
);
 
function midnightTask() {
    var cont = document.createElement("div");
    cont.className = 'date-row';

    var dayDate =  document.createElement("div");
    dayDate.className = "day-date";
    dayDate.innerText = new Date(Date.now()).toLocaleString().split(',')[0]; //'d MMM yyyy'
    var chat = document.querySelector("#chat");
    cont.appendChild(dayDate);
    chat.appendChild(cont);
}

function loadMessages(){
    
}

function showConversations(){
    conversations.forEach( c => {
        var conv = document.querySelector("#conversations");

        var cont = document.createElement("div");
        cont.className = 'conv-row';
        cont.id = "conver"

        var avatar = document.createElement("div");
        avatar.className = 'avatar';
        var pic = document.createElement("img");
        pic.src = c.user.pic || "avatar.png";
        avatar.appendChild(pic);

        var convInfo = document.createElement("div");
        convInfo.className = 'contact-info';
        
        var userName = document.createElement("div");
        userName.className = 'user-name';
        userName.innerText = c.user.userName;
        
        
        var preview = document.createElement("div");
        preview.className = 'text-preview';
        preview.innerText = limitLength(c.text, 50);
        
        convInfo.appendChild(userName);
        convInfo.appendChild(preview);

    
        cont.appendChild(avatar);
        cont.appendChild(convInfo);

        conv.appendChild(cont);
    })
}

function sendMessage(){

    var input = document.querySelector("input");
    if(input.value == '') return

    var cont = document.createElement("div");
    cont.className = 'message-row';
    var bubble = document.createElement("div");
    bubble.className = 'out-message';
    var text = document.createElement("p");
    text.className = 'text-message';
    
    text.innerText = input.value;
    
    var date = document.createElement("p");
    date.className = 'date-message';
    date.innerText = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    bubble.appendChild(text);
    bubble.appendChild(date);
    cont.appendChild(bubble);

    var chat = document.querySelector("#chat");
    chat.appendChild(cont);
    input.value = '';

    updateScroll();
}


function updateScroll(){
    var element = document.getElementById("chat");
    element.scrollTop = element.scrollHeight;
}

function limitLength(text, maxLength) {
    if (!text) {
      return ''
    }
    return text.length > maxLength
      ? text.slice(0, maxLength - 3).concat('...')
      : text
  }