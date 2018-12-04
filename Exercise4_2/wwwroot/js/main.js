

require.config({
    baseUrl: "js",
    paths: {
        jquery: "lib/jQuery/jquery.min",
        knockout: "lib/knockout/dist/knockout.debug",
        text: "lib/text/text",
        dataService: "services/dataservice"
        
    }
});

//Register the components:
require(['knockout'], function (ko) {
    ko.components.register("post-list",
        {
            viewModel: { require: "components/postList/postList" },
            template: { require: "text!components/postList/postListView.html" }
        });

    ko.components.register("single-post",
        {
            viewModel: { require: "components/singlePost/singlePost" },
            template: { require: "text!components/singlePost/singlePostView.html" }
        });
});


//Start application
require(['knockout', 'app/viewModel'], function (ko, main) {
    ko.applyBindings(main)
});