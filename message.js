
const SEND = 'send_message'
const RECEIVE = 'receive_message'
const types = {TEXT: 'text', TYPING: 'typing', PRIVATE: 'private', LOG: 'log', USER: 'user'}

class Message {
    userId = null
    userName = null
    text = null
    timestamp = null
    type = null

    constructor(userName, text, type, timestamp, userId){
        this.userName = userName || null;
        this.text = text || null;
        this.timestamp = timestamp || new Date().getTime();
        this.type = type || types.TEXT;
        this.userId = userId || null;
    }
}

function sendMessage(room, type, userId){

    switch (type) {
        case types.USER:

            var username = getUsername(room, server.user_id);
            var msg = new Message(username, findUser(username).pic, types.USER);
            server.sendMessage(JSON.stringify(msg));
            break;

        case types.LOG:
            var msg = new Message(getUsername(room, server.user_id), room.chats[0].messages, types.LOG);
            server.sendMessage(JSON.stringify(msg), [userId]);
            break;
    
        default:
            var input = document.querySelector("#type-section");
            if(input.value == '') return;

            var msg = new Message(getUsername(room, server.user_id), input.value);

            server.sendMessage(JSON.stringify(msg));
            showMessage(room, msg, SEND); 
            addMessage(room.chats[0], msg, server.user_id);
            break;
    }
    
}

function JSONtoMessage(json){
    obj = JSON.parse(json);
    return obj ? new Message(obj.userName, obj.text, obj.type, obj.timestamp) : undefined;
}

function showMessage(room, msg, action, userId){

    var userName = userId ? getUsername(room, userId) : 'You';
    
    var msgClass = action == SEND ? 'send' : 'receive';
    var cont = document.createElement("div");
    cont.className = 'message-row ' + msgClass;
    var bubble = document.createElement("div");
    bubble.className = 'message ' + msgClass;

    var user = document.createElement("p");
    user.className = 'user-message ' + msgClass;
    
    user.innerText = userName || userId;

    var text = document.createElement("p");
    text.className = 'text-message';
    
    text.innerText = msg.text;
    
    var date = document.createElement("p");
    date.className = 'date-message';
    date.innerText = new Date(msg.timestamp).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    bubble.appendChild(user);
    bubble.appendChild(text);
    bubble.appendChild(date);
    cont.appendChild(bubble);

    var chat = document.querySelector("#chat");
    if(msg.type == types.TEXT){
        chat.appendChild(cont);

        if(action == SEND){
            var input = document.querySelector("#type-section")
            input.value='';
        }

    }else if(msg.type == types.LOG){
        var reference = document.querySelector("#date-row");
        chat.insertBefore(cont, reference)
    }
    updateScroll();
}


function loadMessages(room){
    room.chats[0].messages.forEach(msg => {
        showMessage(room, msg, RECEIVE, msg.userId);
    })
    hideElement("load-row");
}