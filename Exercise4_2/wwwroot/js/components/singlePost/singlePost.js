define(['jquery', 'knockout', 'dataService'], function ($, ko, ds) {
    return function (params) {

        var post = ko.observable();
        var answerArray = ko.observableArray([]);
        var qid = parseInt(params._qid());
        ds
        $.getJSON("api/posts/" + qid, function (data) {
            post([]);
            post({ link: data.link, title: data.title, creationDate: data.creationDate, score: data.score, body: data.body });
        });

        ds.getSinglePost(qid, function(data) {
            post([]);
            post(data);
        });

        return {
            post,
            qid,
            answerArray
        };
    }
})