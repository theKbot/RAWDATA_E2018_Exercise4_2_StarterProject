define(['jquery'], function ($) {

    var getPosts = function (page, pageSize, callback) {
        $.getJSON("api/posts", "page=" + page + "&pageSize=" + pageSize, function (data) {
            callback(data);
        });
    }

    return {
        getPosts

    }
});