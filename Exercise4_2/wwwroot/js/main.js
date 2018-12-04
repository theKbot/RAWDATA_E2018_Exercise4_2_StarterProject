

require.config({
    baseUrl: "js",
    paths: {
        jquery: "lib/jQuery/jquery.min",
        knockout: "lib/knockout/dist/knockout.debug",
        text: "lib/text/text",
        dataService: "services/ds"
        
    }
});

require(['knockout', 'app/viewModel'], function (ko, vm) {
    ko.applyBindings(vm);
});