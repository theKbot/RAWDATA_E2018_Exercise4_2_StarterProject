define(['jquery', 'knockout'], function ($, ko) {
    return function (params) {

        var post = ko.observable();
        var answerArray = ko.observableArray([]);
        var qid = parseInt(params._qid);

        $.getJSON("api/posts/" + parseInt(qid), function (data) {
            post([]);
            post({ link: data.link, title: data.title, creationDate: data.creationDate, score: data.score, body: data.body });
        });

        /*$.getJSON("api/posts/" + qid + "/answers", function (data) {
            answerArray([]);
            answerArray(data);
        });*/

        return {
            post,
            qid,
            answerArray
        };
    }
})