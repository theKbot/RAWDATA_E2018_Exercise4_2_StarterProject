

require.config({
    baseUrl: "js",
    paths: {
        jquery: "lib/jQuery/jquery.min",
        knockout: "lib/knockout/dist/knockout.debug"
    }
});

require(['knockout', 'app/viewModel'], function (ko, vm) {
    ko.applyBindings(vm);
});