$(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyC2MzU9mQj7ym2JPcLMN9uMLo1i0YrEFTQ",
		authDomain: "blog-jimmywu-cc.firebaseapp.com",
		databaseURL: "https://blog-jimmywu-cc.firebaseio.com",
		projectId: "blog-jimmywu-cc",
		storageBucket: "blog-jimmywu-cc.appspot.com",
		messagingSenderId: "383220126864"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    function changeUrlToKey(url) {
        return url.replace(new RegExp('\\/|\\.', 'g'), "_");
    }

    function readVisits(selector, url, isReadOnly) {
        var db_key = changeUrlToKey(window.location.host) + "/" + changeUrlToKey(url);
        database.ref(db_key).once("value").then(function (result) {
            var count = parseInt(result.val() || 0);
            if (!isReadOnly) {
                count += 1;
                database.ref(db_key).set(count);
            }
            if (selector.length > 0) {
                selector.html(count);
            };
        });
    }
    readVisits($("#visits .count"), "/");

    $(".pageviews").each(function () {
        var postUrl = $(this).data("path");
        var isReadOnly = window.location.pathname === "/";
        readVisits($(this).find(".count"), postUrl, isReadOnly);
    });
});