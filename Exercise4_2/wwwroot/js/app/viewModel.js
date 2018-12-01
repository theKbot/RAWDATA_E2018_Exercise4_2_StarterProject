define(['jquery', 'knockout'], function ($, ko) {

    var link = ko.observable("something");
    var title = ko.observable("What is love");
    var fullPost = ko.computed(function () {
        return link() + " " + title();
    });

    var currentUI = ko.observable("postUI");
    var page = ko.observable(0);
    var postArray = ko.observableArray([]);
    var maxPage;

    //Get the JSON and append it to array
    $.getJSON("api/posts", "page="+page()+"&pageSize=10", function (data) {
        return postArray(data);
    });

    //Goto next page
    var nextPage = function () {
        page = ko.computed(function () {
            alert(page())
            return page() + 1;
        });
    }
    //Goto prev page
    var prevPage = function () {
        page = ko.computed(function () {
            return page() - 1;
        });
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