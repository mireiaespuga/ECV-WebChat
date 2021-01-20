function msToMidnight(){
    var midnight = new Date();
    midnight.setHours(24,0,0,0); 

    var now = new Date();
    return midnight - now;
} 

function midnightTask() {
    var cont = document.createElement("div");
    cont.className = 'date-row';
    cont.id = 'date-row';

    var dayDate =  document.createElement("div");
    dayDate.className = "day-date";
    dayDate.innerText = new Date(Date.now()).toLocaleString().split(',')[0]; //'d MMM yyyy'
    var chat = document.querySelector("#chat");
    cont.appendChild(dayDate);
    chat.appendChild(cont);
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

function hideElement(id){
    document.getElementById(id).style.display = 'none';
}

function showElement(id){
    var display = 'flex';
    if(id == "webchat" ){
        display = 'grid';
    }
    document.getElementById(id).style.display = display;
}

function showFeedback(id, text) {
    var feedback = document.getElementById(id);
    feedback.style.visibility = 'visible';
    feedback.innerText = text;
    setTimeout(() => {
        feedback.style.visibility = 'hidden';
      }, 5000)
}

function sortByProperty(list, property, mode = 'asc') {
    if (!list) return list
    const dir = mode === 'asc' ? 1 : -1
    return list.sort((a, b) =>
      a[property] > b[property] ? 1 * dir : -1 * dir
    )
  }

