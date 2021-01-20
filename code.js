var myself;
var server = new SillyClient(); //create our class
var chat = new Chat();
var room = new Room();
var loadbutton;

if(!myself){
    hideElement('webchat');
}

server.on_message = function(user_id, data){
    var message = JSONtoMessage(data)

    switch (message.type) {
        case types.USER:
            var newUser = new User(message.userName, user_id, message.text);
            addUserToRoom(room, newUser);
            break;
        
        case types.LOG:
            room.chats[0].messages = message.text;
            canShowLog(room, room.name);
            loadbutton = document.querySelector("#load_button");
            if(loadbutton){
                loadbutton.addEventListener("click", function(e){
                    loadMessages(room);
                });
            }   
            break;

        default:
            showMessage(room, message, RECEIVE, user_id);
            addMessage(room.chats[0], message, user_id);
            break;
    }
    
}

server.on_ready = function(author_id) {
    myself.id = server.user_id || author_id;
    addUserToRoom(room, myself);
    sendMessage(room, types.USER);
    loadWebchat(myself);
    hideElement('init');
    showElement('webchat');
}

server.on_connect = function() {
    
}

server.on_user_connected = function(user_id, data){
    sendMessage(room, types.USER);

    if(Object.keys(server.clients).map(Number).sort()[0] == myself.id){
        sendMessage(room, types.LOG, user_id);
    }

}

server.on_user_disconnected = function(user_id){  
	console.log("Somebody has disconnected from the room");
}

server.on_close = function(){  
	console.log("Server closed the connection" );
}


var msToMidnight = msToMidnight();
midnightTask();


var submitbutton = document.querySelector("#submit_button");
submitbutton.addEventListener("click", function(){
    var roomName = document.getElementById("room").value;
    room.name = roomName;
    chat.chatName = roomName;
    chat.pic = ROOM_AVATAR;
    room.chats = [chat];
    var out = validateUser(room)
    if(out.result){
        server.connect("wss://ecv-etic.upf.edu/node/9000/ws", room.name.toUpperCase(), function(){  
            console.log("Connected to server! :)");  
            myself = new User(out.userName)
        }
        );
    }
}
);

var sendbutton = document.querySelector("#send_button");
sendbutton.addEventListener("click", function(e){
    sendMessage(room);
});

var myavatar = document.querySelector("#my-avatar");
myavatar.addEventListener("click", function(e){
   changeAvatar();
});

var input = document.querySelector("#type-section")
input.addEventListener('keydown', function(e){
    if(e.key == 'Enter'){
        sendMessage(room);
    } 
});

setTimeout(
    midnightTask,
    msToMidnight
);
 



