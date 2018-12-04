define(['jquery'], function ($) {

    //Get lists of posts corresponding to page and pageSize
    var getPosts = function (page, pageSize, callback) {
        $.getJSON("api/posts", "page=" + page + "&pageSize=" + pageSize, function (data) {
            callback(data);
        });
    }


    //Get single posts with answers
    var getSinglePost = function (id, callBack) {
        $.getJSON("api/posts/" + id, function (data) {
            callBack({ link: data.link, title: data.title, creationDate: data.creationDate, score: data.score, body: data.body });
        });
    }



    return {
        getPosts,
        getSinglePost
    }
});