var app = angular.module('apiary', [
    'ui.router',
    'mainModule'
]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise(function($injector, $location) {
      console.log("Error")
    });

    console.log("YEY");

    $stateProvider
        .state("main", {
            url: "",
            views: {
                '': {
                    templateUrl: 'templates/layout.html',
                    controller: 'mainController'
                },
                'topbar@main': {
                    templateUrl: '/templates/navbar.html',
                }
              }
            })
}])
