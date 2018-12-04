define(['jquery', 'knockout'], function ($, ko) {

    //Some variables
    var link = ko.observable();
    var title = ko.observable();
    var fullPost = ko.computed(function () {
        return link() + " " + title();
    });
    var currentUI = ko.observable("postUI");
    var page = ko.observable(0);
    var maxPage = ko.observable(2);
    var pageXoutofY = ko.computed(function () {
        return page() + "/" + maxPage();
    })
    var pageSize = ko.observable(5);
    var postArray = ko.observableArray([]);
    var answerArray = ko.observableArray([]);
    var post = ko.observable();



    //Get posts from page
    $.getJSON("api/posts", "page=" + page() + "&pageSize=" + pageSize(), function (data) {
        maxPage(parseInt(data.pages)-1);
        postArray.push(data);
    });



    var showPost = function (data) {
        var split = data.split("/");
        var id = split[split.length - 1];
        $.getJSON("api/posts/" + id, function (data) {
            post([]);
            post({ link: data.link, title: data.title, creationDate: data.creationDate, score: data.score, body: data.body });
        });

        $.getJSON("api/posts/" + id + "/answers", function (data) {
            answerArray([]);
            answerArray(data);
        });
        changeUI();
    }

    //Goto next page
    var canClickNext = ko.computed(function () {
        return (page() < maxPage());
    });

    var nextPage = function () {
        if (page() > maxPage() - 1) { page(0); }
        else { page(page() + 1); }

        $.getJSON("api/posts", "page=" + page() + "&pageSize=" + pageSize(), function (data) {
            postArray([]);
            postArray.push(data);
        }
        );
    }

    //Goto prev page
    var canClickPrev = ko.computed(function () {
        return (page() > 0);
    });

    var prevPage = function () {
        if (page() < 1) { page(maxPage()); }
        else { page(page() - 1) }

        $.getJSON("api/posts", "page=" + page() + "&pageSize=" + pageSize(), function (data) {
            postArray([]);
            postArray.push(data);
        }
        );
    }

    //Change the UI
    var changeUI = function () {
        if (currentUI() === "postUI") {
            currentUI("singlePostUI");
        }
        else {
            currentUI("postUI");
        }
    }

    return {
        postArray,
        answerArray,
        link,
        fullPost,
        title,
        nextPage,
        prevPage,
        page,
        maxPage,
        pageXoutofY,
        currentUI,
        changeUI,
        showPost,
        post,
        pageSize,
        canClickNext,
        canClickPrev
    };
});