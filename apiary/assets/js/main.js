var app = angular.module("mainModule", []);

app.controller("mainController", [function() {

}])

app.controller("masterController", ["User", "$scope", function(User, $scope) {
  $scope.currentUser = User.getCurrent();
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

app.controller("navbarController", ["$scope", "User", function($scope, User) {
}])

app.constant("hiveTypes", [
  "Traditional hive",
  "Top bar hive",
  "Top bar hive with queen excluder",
  "Langstroth hive",
  "Other"
])

app.constant("hiveExposure", [
  "Shady",
  "Partial shade",
  "Sunny"
])

app.controller("hiveController", ["$scope", "hiveTypes", "hiveExposure", function($scope, hiveTypes, hiveExposure) {
  $scope.hive = {}
  $scope.types = []
  $scope.exposures = []
  hiveTypes.forEach(function(type, index) {
    $scope.types.push({
      value: index,
      label: type
    })
  })
  hiveExposure.forEach(function(exposure, index) {
    $scope.exposures.push({
      value: index,
      label: exposure
    })
  })
}])

app.constant("inspectionWeather", [
  "Sunny",
  "Partly cloudy",
  "Cloudy",
  "Rain",
  "Windy"
])

app.constant("inspectionState", [
  "Not in use / not installed",
  "Not yet occupied",
  "Occupied",
  "Absconded",
  "Dead, because of robbing",
  "Dead, because of honey badger",
  "Dead, because of mites",
  "Dead, because of beetle",
  "Dead, because of ants or other insects",
  "Dead, because of fire",
  "Dead, because of flood",
  "Dead, reason unknown"
])

app.constant("inspectionStrenght", [
  "Strong",
  "Moderate",
  "Weak",
  "Critical"
])

app.constant("inspectionTemper", [
  "Calm",
  "Nervous",
  "Angry"
])

app.constant("levels", [
  "High",
  "Average",
  "Low"
])

app.constant("weights", [
  "Light",
  "Moderate",
  "Heavy"
])

app.constant("conditions", [
  "Good",
  "Fair",
  "Poor",
  "Damaged"
])

app.controller("inspectionController", ["$scope", "inspectionWeather", "inspectionState", "inspectionStrenght", "inspectionTemper", "levels", "weights", "conditions",
function($scope, inspectionWeather, inspectionState, inspectionStrenght, inspectionTemper, levels, weights, conditions) {
  $scope.inspection = {}
  $scope.things = [
    {
      label: "Weather conditions",
      model: "weather",
      array: inspectionWeather
    },{
      label: "State of hive",
      model: "state",
      array: inspectionState
    },{
      label: "Strength of the colony",
      model: "strength",
      array: inspectionStrenght
    },{
      label: "Temper of the hive",
      model: "temper",
      array: inspectionTemper
    },{
      label: "Honey stores",
      model: "honey",
      array: levels
    },{
      label: "Pollen stores",
      model: "pollen",
      array: levels
    },{
      label: "Small Hive Beetle",
      model: "beetle",
      array: weights
    },{
      label: "Varrao Mites",
      model: "mites",
      array: weights
    },{
      label: "Hive Condition",
      model: "hive_condition",
      array: conditions
    },{
      label: "Protective clothing and tools condition",
      model: "tools_condition",
      array: conditions
    }
  ]

  $scope.things.forEach(function(thing) {
    temp = thing.array
    thing.array = []
    temp.forEach(function(t, index) {
      thing.array.push({
        value: index,
        label: t
      })
    })
  })
}])

app.controller("registerController", ["$scope", "$state", "$http", function($scope, $state, $http) {
  $scope.user = {
    username: "",
    password: ""
  }
  $scope.register = function() {
      var data = {};
      $http.post("/api/auth/local/register/", data, {
          headers: {
              Authorization: "Basic " + btoa($scope.user.username + ":" + $scope.user.password),
              email: $scope.email
          }
      }).success(function(res) {
          $state.go("main");
      });
  }
}])

app.controller("loginController", ["$scope", "$state", "$http", "User", function($scope, $state, $http, User) {
  $scope.user = {
    username: "",
    password: ""
  }
  $scope.login = function() {
      $http.get("/api/auth/local/login/", {
          headers: {
              Authorization: "Basic " + btoa($scope.user.username + ":" + $scope.user.password)
          }
      }).success(function(res) {
        User.setCurrent(user);
        $state.go("main");
      })
  };
}])

app.factory("User", [function() {
  var current;
  return {
    getCurrent: function() {
      return current;
    },
    setCurrent: function(user) {
      current = user;
    }
  }
}])
