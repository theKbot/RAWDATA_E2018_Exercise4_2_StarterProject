define(['jquery'], function ($) {

    //Get lists of posts corresponding to page and pageSize
    var getPosts = function (page, pageSize, callback) {
        $.getJSON("api/posts", "page=" + page + "&pageSize=" + pageSize, function (data) {
            callback(data);
        });
    }


    //Get single posts with answers
    var getSinglePost = function (id, callback1, callback2) {
        $.getJSON("api/posts/" + id, function (data) {
            callBack1({ link: data.link, title: data.title, creationDate: data.creationDate, score: data.score, body: data.body });
        });

        $.getJSON("api/posts/" + id + "/answers", function (data) {
            callback2(data);
        });
    }


    return {
        getPosts,
        getSinglePost
    }
});