define(['jquery', 'knockout'], function ($, ko) {

    var link = ko.observable("something");
    var title = ko.observable("What is love");
    var fullPost = ko.computed(function () {
        return link() + " " + title();
    });

    var page = ko.observable("0");
    var postArray = ko.observableArray([]);
    var maxPage;
    $.getJSON("api/posts", "page="+page()+"&pageSize=10", function (data) {
        postArray(data);
    }
    );

    

    var nextPage = function () {
        page = ko.computed(function () {
            alert(page());
            return parseInt(page() + 1);
        });
        $.getJSON("api/posts", "page=" + page() + "&pageSize=10", function (data) {
            postArray(data);
        }
        );
    }
    var prevPage = function () {
        page = ko.computed(function () {
            return parseInt(page()) - 1;
        });
        $.getJSON("api/posts", "page=" + page() + "&pageSize=10", function (data) {
            postArray(data);
        }
        );
    }

    return {
        postArray,
        link,
        fullPost,
        title,
        nextPage,
        prevPage,
        page,
        maxPage
    };
});