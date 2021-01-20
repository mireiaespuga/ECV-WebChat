
class Room{
    users = []
    name = null
    chats = []

    constructor(roomName, users, chats){
        this.name = roomName || null;
        this.users = users || [];
        this.chats = chats || [];
    }

}


function canAddUser(room, username){
    if(!username) return {result: false, error:'Empty Username', type: "user"};
    if(isUserInRoom(room, username)){
        return {result: false, error:'Username already in use', type: "user"} ;
    }else{
        return {result: true, error:'Username is valid', type: "user"} ;
    }
}

function isUserInRoom(room, username) {
    return !room.users.find(u => u.userName.toLowerCase() == username.toLowerCase()) ? false : true
}

function addUserToRoom(room, user) {
    if(!isUserInRoom(room, user.userName)){
        room.users.push(user);
    }
}

function validateUser(room){
    var userName = document.getElementById("username").value;
    
    var result = canAddUser(room, userName);
    if(!result.result){
        id = result.type == "user" ? "username-feedback" : "room-feedback";
        showFeedback(id, result.error);
        return {result: false, userName:userName};
    }else if(result.result){
        return {result: true, userName:userName};
    }
}

function getUsername(room, userId) {
    if(!room) return
    var user = room.users.find(u => {
        if(u.id == userId){
            return u.userName;
        }
    })

    return user ? user.userName : undefined;
}

function canShowLog(room, chatName){
    
    if(chatHasLogs(getChat(chatName))){ //there are previous messages
        var chat = document.querySelector("#chat");
        var cont = document.createElement("div");
        cont.className = 'date-row';
        cont.id = 'load-row';

        var reference = document.querySelector("#date-row");
        var loadButton = document.createElement("button");
        loadButton.id = "load_button";
        loadButton.className = 'load_button';
        loadButton.innerText = 'Previous messages'

        cont.appendChild(loadButton);
        chat.insertBefore(cont, reference);
    }
}

function getChat(chatName) {
    return room.chats.find(c => c.chatName == chatName)
}
