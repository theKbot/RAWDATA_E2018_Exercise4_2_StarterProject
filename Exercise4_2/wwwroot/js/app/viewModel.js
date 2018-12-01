define(['jquery', 'knockout'], function ($, ko) {

    //Some variables
    var link = ko.observable("something");
    var title = ko.observable("What is love");
    var fullPost = ko.computed(function () {
        return link() + " " + title();
    });
    var currentUI = ko.observable("postUI");
    var page = ko.observable(0);
    var maxPage = ko.observable(2);
    var pageSize = ko.observable(5);
    var postArray = ko.observableArray([]);
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
            post({ link: data.link, title: data.title, creationDate: data.creationDate, score: data.score, body: data.body});
            changeUI();
        })
    }

    //Goto next page
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
        link,
        fullPost,
        title,
        nextPage,
        prevPage,
        page,
        maxPage,
        currentUI,
        changeUI,
        showPost,
        post,
        pageSize
    };
});