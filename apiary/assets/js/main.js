var app = angular.module("mainModule", []);

app.controller("mainController", [function() {

}])

app.controller("masterController", [function() {

}])

app.controller("apiaryController", ["$scope", function($scope) {
  $scope.apiry = {}

  $scope.create = function() {

  }

}])

app.controller("navbarController", ["$scope", function($scope) {
  $scope.openMenu = function($mdOpenMenu, ev) {
     $mdOpenMenu(ev);
   };
}])
