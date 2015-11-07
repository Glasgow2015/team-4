var app = angular.module("mainModule", []);

app.controller("mainController", [function() {

}])

app.controller("masterController", [function() {

}])

app.controller("apiaryController", ["$scope", "apiaryQuestions", function($scope, apiaryQuestions) {
  $scope.apiry = {}
  $scope.questions = []
  apiaryQuestions.forEach(function(q) {
    $scope.questions.push({
      string: q,
      value: false
    })
  })
  $scope.create = function() {

  }

  $scope.readableTruthy = function(bool) {
    if(bool) {
      return "Yes"
    } else {
      return "No"
    }
  }

}])

.constant('apiaryQuestions', [
  "Is water supply within 3km radius of apiary",
  "Is vegetation within 3km radius of apiary miombo woodlands",
  "Is vegetation within 3km radius of apiary closed forests",
  "Is vegetation within 3km radius of apiary grassland",
  "Is vegetation within 3km radius of apiary forest plantation",
  "Is vegetation within 3km radius of apiary sisal pantation",
  "Is vegetation within 3km radius of apiary orchard",
  "Is vegetation within 3km radius of apiary mixed crops",
  "Do farmers within a radius of 3km of the apiary use pesticides",
  "Is the apiary accessible by vehicles",
  "Is the apiary accessible by bycicle or motorcycle",
  "Is the apiary accessible by foot",
  "Natural nest apiaries",
  "Tree apiaries",
  "Breast height (or stand) apiaries",
  "Bee house apiaries",
  "Honey badger stand"
])

app.controller("navbarController", ["$scope", function($scope) {
}])
