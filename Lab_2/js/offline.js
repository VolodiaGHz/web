(function () {
    if (window.applicationCache) {
        window.applicationCache.onupdateready = function () {
            logCacheSteps('Update ready');
            logCacheSteps('Cache swaping');
            window.applicationCache.swapCache();
        };

        window.applicationCache.onchecking = function () {
            logCacheSteps('Checkin cache');
        };

        window.applicationCache.onnoupdate = function () {
            logCacheSteps('No Update');
        };

        window.applicationCache.oncached = function () {
            logCacheSteps('Cached');
        };

        window.applicationCache.onobsolete = function () {
            logCacheSteps('Obsolete');
        };

        window.applicationCache.ondownloading = function () {
            logCacheSteps('Downloading');
        };

        window.applicationCache.onerror = function () {
            logCacheSteps('Error');
        };

        logCacheSteps('Windows Load');
    }
})();

// show cache steps on the screen
function logCacheSteps(msg) {
    var ul = document.getElementById('log')
    var li = document.createElement('li');//create li
    li.appendChild(document.createTextNode(msg));//create li text
    ul.appendChild(li);//place li in ul
}