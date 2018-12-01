define(['jquery', 'knockout'], function ($, ko) {

    //Some variables
    var link = ko.observable("something");
    var title = ko.observable("What is love");
    var fullPost = ko.computed(function () {
        return link() + " " + title();
    });
    var currentUI = ko.observable("postUI");
    var page = ko.observable(0);
    var postArray = ko.observableArray([]);
    var maxPage = ko.observable(2);

    //Get posts from page
    $.getJSON("api/posts", "page=" + page() + "&pageSize=10", function (data) {
        maxPage(parseInt(data.pages));
        postArray(data);
    });

    var showPost = function(data) {
        var split = data.split("/");
        var id = split[split.length - 1];
        var post = ko.observable();
        $.getJSON("api/posts/" + id, function (data) {
            post(data);
        })
    }

    //Goto next page
    var nextPage = function () {
        if (page === maxPage - 1) { alert("memes"); page(0); }
        else { page(page() + 1) }

        $.getJSON("api/posts", "page=" + page() + "&pageSize=10", function (data) {
            postArray(data);
        }
        );
    }

    //Goto prev page
    var prevPage = function () {
        if (page === 0) { page(maxPage); }
        else { page(page() - 1) }

        $.getJSON("api/posts", "page=" + page() + "&pageSize=10", function (data) {
            postArray(data);
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
        showPost
    };
});