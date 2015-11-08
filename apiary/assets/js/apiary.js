var app = angular.module('apiary', [
    'ui.router',
    'mainModule',
    'mgcrea.ngStrap',
    'ngMaterial'
]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise(function($injector, $location) {
      var url = document.URL;
      var origin = location.origin;
      var lastChar = url.substr(url.length - 1);
      if (lastChar == "/") {
          $location.path("/");
      } else {
          var index = url.indexOf("?");
          if(~index) {
              window.location.replace(url.substr(0, index) + "/" + url.substr(index));
          } else {
              window.location.replace(url += "/");
          }
      }
  });

    console.log("YEY");

    $stateProvider
        .state("main", {
          url: "/",
          views: {
            '': {
              templateUrl: 'templates/layout.html',
              controller: 'mainController',
              resolve: {
                "currentUser": ["$http", "User", "$q", "$state", function($http, User, $q, $state) {
                    return $http.get("api/me").then(function(res) {
                      var deferred = $q.defer();
                      if(res.data.error) {
                        deferred.reject()
                        $state.go("login");
                      } else {
                        deferred.resolve(res.data);
                      }
                      return deferred.promise;
                    })
                }]
              }
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
          url: "apiary",
          views: {
            'body@main': {
              templateUrl: '/templates/apiary.html',
              controller: 'apiaryController'
            }
          }
        })
        .state("main.hive", {
          url: "hive",
          views: {
            'body@main': {
              templateUrl: '/templates/hive.html',
              controller: 'hiveController'
            }
          }
        })
        .state("main.inspection", {
          url: "inspection",
          views: {
            'body@main': {
              templateUrl: '/templates/inspection.html',
              controller: 'inspectionController'
            }
          }
        })
        .state("register", {
          url: "/register",
          views: {
            '': {
              templateUrl: 'templates/layout.html',
            },
            'topbar@register': {
              templateUrl: '/templates/navbar.html',
              controller: 'navbarController'
            },
            'body@register': {
              templateUrl: '/templates/register.html',
              controller: 'registerController'
            }
          }
        })
        .state("login", {
          url: "/login",
          views: {
            '': {
              templateUrl: 'templates/layout.html',
            },
            'topbar@login': {
              templateUrl: '/templates/navbar.html',
              controller: 'navbarController'
            },
            'body@login': {
              templateUrl: '/templates/login.html',
              controller: 'loginController'
            }
          }
        })
}])
