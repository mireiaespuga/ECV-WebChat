


class Chat {
    isPrivate = null
    chatName = null
    pic = null
    users = []
    startDate = null 
    messages = []
    lastText = ''

    constructor(isPrivate, chatName, users, startDate, pic){
        this.isPrivate = isPrivate || false;
        this.chatName = chatName || null;
        this.users = users || [];
        this.startDate = startDate || new Date().getTime();
        this.pic = pic || DEFAULT_AVATAR; 
    }
}

function showConversations(){
    var conv = document.querySelector("#conversations");
    room.chats.forEach( c => {
        console.log(room)

        var cont = document.createElement("div");
        cont.className = 'conv-row';
        cont.id = "conver"

        var avatar = document.createElement("div");
        avatar.className = 'avatar';
        var pic = document.createElement("img");

        if(c.isPrivate){
            var privateUser = c.users.find(u => u.id != server.user_id)
            pic.src = privateUser ? privateUser.pic : DEFAULT_AVATAR;
        }else{
            pic.src = c.pic || ROOM_AVATAR;
        }
          
        avatar.appendChild(pic);

        var convInfo = document.createElement("div");
        convInfo.className = 'contact-info';
        
        var userName = document.createElement("div");
        userName.className = 'user-name';
        userName.innerText = c.chatName;
        
        
        var preview = document.createElement("div");
        preview.id = 'text-preview ' + chat.chatName;
        preview.className = 'text-preview';
        preview.innerText = limitLength(c.lastText, 50);
        
        convInfo.appendChild(userName);
        convInfo.appendChild(preview);

    
        cont.appendChild(avatar);
        cont.appendChild(convInfo);

        conv.appendChild(cont);

    })

}

function loadWebchat(myself) {
    var myUsername = document.querySelector("#my-username");
    myUsername.innerText = myself.userName;

    setMyAvatar();

    showConversations();
    loadChat(getChat(room.name));
}

function addMessage(chat, message, userId) {
    if(message.type == types.TEXT){
        var logMsg = new Message(message.userName, message.text, types.LOG, message.timestamp, userId)
        chat.messages.push(logMsg)
        chat.messages = sortByProperty(chat.messages, 'timestamp');
        chat.lastText = message.text;

        var id = 'text-preview ' + chat.chatName;
        var lastText = document.getElementById(id);
        lastText.innerText = limitLength(chat.lastText, 50);
    }
}

function chatHasLogs(chat) {
    return chat.messages.length > 0;
}

function loadChat(chat) {

    var groupName = document.querySelector("#group-name");
    groupName.innerText = chat.chatName;

    var groupAvatar = document.querySelector("#group-pic");

    var pic = document.createElement("img");
    if(chat.isPrivate){
        var privateUser = chat.users.find(u => u.id != server.user_id)
        pic.src = privateUser ? privateUser.pic : DEFAULT_AVATAR;
    }else{
        pic.src = chat.pic || ROOM_AVATAR;
    }
    
    groupAvatar.appendChild(pic);
}