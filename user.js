
const DEFAULT_AVATAR = "Assets/avatar.png";
const ROOM_AVATAR = "Assets/room.png";
const OTHER_AVATARS = {SPORT: 'Assets/Soccer.png', ZEN: 'Assets/Ying-Yang.png', NATURE: 'Assets/Earth.png', CD: 'Assets/cd.png'}

class User {
    userName = null
    id = null
    pic =  null

    constructor(userName, id, pic){
        this.userName = userName || null;
        this.id = id || null;
        this.pic = pic || DEFAULT_AVATAR;
    }
}

function matchClientToUsername(room, username) {
    var userId = server.clients.find(cl => {
        if(cl.name == username) return cl.id;
    });

    return userId ? getUsername(room, userId) : undefined
}

function changeAvatar() {
    hideElement('webchat');
    showElement('avatars');

    var new_avatar;

    var pic1 = document.querySelector("#pic1");
    pic1.src = OTHER_AVATARS.SPORT;

    var b2 = document.querySelector("#pic2");
    pic2.src = OTHER_AVATARS.ZEN;

    var pic3 = document.querySelector("#pic3");
    pic3.src = OTHER_AVATARS.NATURE;

    var pic4 = document.querySelector("#pic4");
    pic4.src = OTHER_AVATARS.CD;

    pic1.addEventListener("click", function(e){
        new_avatar =  OTHER_AVATARS.SPORT;
    });

    pic2.addEventListener("click", function(e){
        new_avatar = OTHER_AVATARS.ZEN;
    });

    pic3.addEventListener("click", function(e){
        new_avatar = OTHER_AVATARS.NATURE;
    });

    pic4.addEventListener("click", function(e){
        new_avatar = OTHER_AVATARS.CD;
    });

    avatar_button.addEventListener("click", function(e){
        myself.pic = new_avatar || DEFAULT_AVATAR;
        hideElement('avatars');
        showElement('webchat');
        setMyAvatar();

    });

}

function setMyAvatar() {
    var myAvatar = document.querySelector("#my-avatar");
    myAvatar.src = myself.pic;
    sendMessage(room, types.USER);
}