//create variable for article name
var title = document.querySelector('input[name="title"]');
//article text
var article = document.querySelector('textarea[name="article"]');
//returns true if online, false if offline
function isOnline() {
    return window.navigator.onLine;
}

function reportNetworkStatus() {
    if (isOnline()) {//if navigator.online == true
        document.getElementById('status').classList.add('online');//add online class (green color) to button
        document.getElementById('status').classList.remove('offline');
        document.getElementById('status').innerHTML = 'Online';
    } else {
        document.getElementById('status').classList.add('offline');
        document.getElementById('status').classList.remove('online');
        document.getElementById('status').innerHTML = 'Offline';
    }
}

function send() {
    //create object to store article information
    var box = {};

    box.title = title.value;
    box.article = article.value;
    box.id = new Date().getTime().toString();
    //send message to server or store localy
    storeMessage(box);

    return false;
};

// store article localy ore remotely
function storeMessage(box) {
    if (isOnline()) {
        // send article to server
        storeMessageRemotely(box);
    } else {
        // store article localy
        storeMessageLocaly(box);
    }
}

function storeMessageLocaly(box) {
    addItem(box.id, box);//см db.js
    clearUI();
    logEvent('Message saved locally: "' + box.title + '"');
}

//TODO: Implement after learning Node.js
function storeMessageRemotely(box) {
    clearUI();
    logEvent('Message sent to server: "' + box.title + '"');
}

function sendAllMessagesToServer() {
    var messages = [];
    getAllItems(function (result) {
        messages = result; // get all articles frome local storage
    });

    for (var i = 0; i < messages.length; i++) {
        storeMessageRemotely(messages[i]);
        logEvent('Message sent to server: "' + messages[i].title + '"');
        deleteItem(messages[i].id);//delete all articles in local storage
    }
}

function clearUI () {
    title.value = '';
    article.value = '';
}

function logEvent (msg) {
    //list with logs
    var log = document.getElementById('log-message');
    var li = document.createElement('li');//create li
    li.appendChild(document.createTextNode(msg));//create li text
    log.appendChild(li);//place li in list
}

(function () {
    if (window.applicationCache) {
        window.addEventListener('online', function (e) {
            reportNetworkStatus();
            sendAllMessagesToServer();
        }, true);

        window.addEventListener('offline', function (e) {
            reportNetworkStatus();
        }, true);
        document.getElementById('submit').addEventListener('click', send, true);
        reportNetworkStatus();

    }
})();