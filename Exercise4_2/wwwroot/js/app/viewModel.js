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
    var maxPage;

    //Get posts from page
    $.getJSON("api/posts", "page="+page()+"&pageSize=10", function (data) {
        postArray(data);
    }
    );

    //Goto next page
    var nextPage = function () {
        page = ko.computed(function () {
            return page() + 1;
        });
        $.getJSON("api/posts", "page=" + page() + "&pageSize=10", function (data) {
            postArray(data);
        }
        );
    }

    //Goto prev page
    var prevPage = function () {
        page = ko.computed(function () {
            return page() - 1;
        });
        $.getJSON("api/posts", "page=" + page() + "&pageSize=10", function (data) {
            postArray(data);
        }
        );
    }

    //Change the UI
    var changeUI = function () {
        if (currentUI() === "postUI") {
            currentUI("textUI");
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
        changeUI
    };
});