var app = angular.module('apiary', [
    'ui.router',
    'mainModule',
    'mgcrea.ngStrap',
    'ngMaterial'
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
              controller: 'navbarController'
            },
            'body@main': {
              templateUrl: '/templates/home.html'
            }
          }
        })
        .state("main.apiary", {
          url: "/apiary",
          views: {
            'body@main': {
              templateUrl: '/templates/apiary.html',
              controller: 'apiaryController'
            }
          }
        })
        .state("main.hive", {
          url: "/hive",
          views: {
            'body@main': {
              templateUrl: '/templates/hive.html',
              controller: 'hiveController'
            }
          }
        })
}])
