function addItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getAllItems(callback) {
	var arr = [];
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var item = JSON.parse(localStorage[key]);
        arr.push(item);
    }
    callback(arr);
}

function deleteItem(key) {
	localStorage.removeItem(key);
}