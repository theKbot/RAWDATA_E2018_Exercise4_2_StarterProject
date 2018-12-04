define(['jquery', 'knockout', 'dataService'], function ($, ko, ds) {
    return function (params) {

        var post = ko.observable();
        var answerArray = ko.observableArray([]);

        var qid = ko.observable(parseInt(params._qid()));

        if (!isNaN(qid())){
            ds.getSinglePost(qid(), function (data) {
                post([]);
                post(data);
            });

            ds.getAnswersToPost(qid(), function (data) {
                answerArray([]);
                answerArray(data);
            });
        }
        return {
            post,
            qid,
            answerArray
        };
    }
})