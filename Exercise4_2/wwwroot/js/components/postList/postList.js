define(['jquery', 'knockout', 'dataService'], function ($, ko, ds) {
    return function (params) {
        var link = ko.observable();
        var title = ko.observable();
        var fullPost = ko.computed(function () {
            return link() + " " + title();
        });
        var page = ko.observable(0);
        var maxPage = ko.observable(0);
        var pageXoutofY = ko.computed(function () {
            return page() + "/" + maxPage();
        })
        var pageSize = ko.observable(5);
        var postArray = ko.observableArray([]);

        var qid = ko.observable("fd");

        //Get posts from dataservice
        ds.getPosts(page(), pageSize(), function (data) {
            postArray.push(data);
            maxPage(data.pages-1);
        });

        //Goto next page
        var canClickNext = ko.computed(function () {
            return (page() < maxPage());
        });

        var nextPage = function () {
            if (page() > maxPage() - 1) { page(0); }
            else { page(page() + 1); }

            ds.getPosts(page(), pageSize(), function (data) {
                postArray([]);
                postArray.push(data);
                maxPage(data.pages - 1);
            });
        }

        //Goto prev page
        var canClickPrev = ko.computed(function () {
            return (page() > 0);
        });

        var prevPage = function () {
            if (page() < 1) { page(maxPage()); }
            else { page(page() - 1) }

            ds.getPosts(page(), pageSize(), function (data) {
                postArray([]);
                postArray.push(data);
                maxPage(data.pages - 1);
            });
        }

        //Show post
        var showPost = function (data) {
            var split = data.split("/");
            qid(split[split.length - 1]);
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
            pageXoutofY,
            pageSize,
            canClickNext,
            canClickPrev,
            showPost,
            qid
        };
    }
});