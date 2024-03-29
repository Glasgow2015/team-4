var app = angular.module("mainModule", []);

app.controller("mainController", ["currentUser", "$scope", "apiaryQuestions", "$http", "months", "$state", "$rootScope", function(currentUser, $scope, apiaryQuestions, $http, months, $state, $rootScope) {
  $scope.currentUser = currentUser;

  $scope.readableTruthy = function(bool) {
    if(bool == true || bool == 'true') {
      return "Yes"
    } else {
      return "No"
    }
  }

  $scope.readableMonths = function(ms) {
    if(!ms) return;
    var string = "";
    ms.forEach(function(m, index) {
      string += months[m-1]
      if(index != ms.length-1) {
        string +=", "
      }
    })
    return string;
  }

  $scope.apiaries = [];
  $scope.selected = -1;
  var getApiaries = function () {
    $http.get("/api/apiary").success(function(res) {
      $scope.apiaries = res;
      $scope.matchQuestions($scope.apiaries);
    })
  }

  $scope.isSelected = function(id){
    return $state.params.id == id;
  }
  getApiaries();

  $scope.matchQuestions = function(apiaries) {
    apiaries.forEach(function(a) {
      a.questions = [];
      apiaryQuestions.forEach(function(q) {
        if(a[q.model]) {
          a.questions.push({
            string: q.string,
            value: a[q.model]
          })
        }
      })
    })
  }

  $rootScope.$on("pullApiaries", function() {
    getApiaries();
  })

  $scope.isApiary = function() {
    return $state.current.name == "main.apiary" || $state.current.name.indexOf("main.apiary.") > -1
  }

  $scope.isHive = function() {
    return $state.current.name == "main.apiary.hive" || $state.current.name.indexOf("main.apiary.hive.") > -1
  }
}])

app.controller("masterController", ["User", "$scope", function(User, $scope) {
}])

app.constant("months", [
  "January",
  "February",
  "March",
  "April",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
])

app.controller("apiaryController", ["$scope", "$http", "$stateParams", function($scope, $http, $stateParams) {
  $scope.apiary = {};
  $scope.hives = [];
  var getApiary = function() {
    $http.get("/api/apiary/"+$stateParams.id).success(function(data) {
      $scope.apiary = data;
      $scope.matchQuestions([$scope.apiary]);
      console.log($scope.apiary);
    })
  }
  $scope.getHives = function() {
    $http.get("/api/hive/apiary/"+$stateParams.id).success(function(hives) {
      $scope.hives = hives;
    })
  }
  getApiary();
  $scope.getHives();
}])

app.controller("apiaryCreateController", ["$scope", "apiaryQuestions", "$http", "months", "$state", "$rootScope", function($scope, apiaryQuestions, $http, months, $state, $rootScope) {
  $scope.apiary = {}
  $scope.questions = []
  $scope.months = []
  apiaryQuestions.forEach(function(q) {
    $scope.questions.push({
      string: q.string,
      value: false,
      model: q.model
    })
  })
  months.forEach(function(month, index) {
    $scope.months.push({
      value: index+1,
      label: month
    })
  })
  $scope.create = function() {
    $scope.questions.forEach(function(q) {
      $scope.apiary[q.model] = q.value
    })
    $http.post("/api/apiary/create", $scope.apiary).success(function (res) {
      $state.go("main.apiary", {id: res.id});
      $rootScope.$emit("pullApiaries");
    })
  }
}])

.constant('apiaryQuestions', [
  {
    string: "Is water supply within 3km radius of apiary",
    model: "water"
  },{
    string: "Is vegetation within 3km radius of apiary miombo woodlands",
    model: "miombo"
  },{
    string: "Is vegetation within 3km radius of apiary closed forests",
    model: "forests"
  },{
    string: "Is vegetation within 3km radius of apiary grassland",
    model: "grass"
  },{
    string: "Is vegetation within 3km radius of apiary forest plantation",
    model: "forestPlantation"
  },{
    string: "Is vegetation within 3km radius of apiary sisal plantation",
    model: "sisalPlantation"
  }, {
    string: "Is vegetation within 3km radius of apiary orchard",
    model: "orchard"
  }, {
    string: "Is vegetation within 3km radius of apiary mixed crops",
    model: "mixed"
  }, {
    string: "Do farmers within a radius of 3km of the apiary use pesticides",
    model: "pesticides"
  }, {
    string: "Is the apiary accessible by vehicles",
    model: "vehicle"
  }, {
    string: "Is the apiary accessible by bycicle or motorcycle",
    model: "cycle"
  }, {
    string: "Is the apiary accessible by foot",
    model: "foot"
  }, {
    string: "Natural nest apiaries",
    model: "natural"
  }, {
    string: "Tree apiaries",
    model: "tree"
  }, {
    string: "Breast height (or stand) apiaries",
    model: "height"
  }, {
    string: "Bee house apiaries",
    model: "beeHouse"
  }, {
    string: "Honey badger stand",
    model: "badger"
  }
])

app.controller("navbarController", ["$scope", "$http", "$state", "apiaryQuestions", function($scope, $http, $state, apiaryQuestions) {
  $scope.logout = function() {
    $http.get("/logout").success(function() {
      $state.go("login");
    })
  }
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

app.controller("hiveController", ["$scope", "$http", "$stateParams", function($scope, $http, $stateParams) {
  $scope.hive = {}
  $scope.getHive = function() {
    $http.get("/api/hive/"+$stateParams.hive).success(function(res) {
      $scope.hive = res;
    })
  }
  $scope.getHive();

  $scope.getInspections = function() {
    $http.get("/api/inspection/hive/"+$stateParams.hive).success(function(res) {
      $scope.inspections = res;
    })
  }
  $scope.getInspections();
}])

app.controller("hiveCreateController", ["$scope", "hiveTypes", "hiveExposure", "$http", "$stateParams", "$state", function($scope, hiveTypes, hiveExposure, $http, $stateParams, $state) {
  $scope.hive = {
    apiary: $stateParams.id
  }
  $scope.types = []
  $scope.exposures = []
  $scope.hiveTypes = hiveTypes;
  $scope.hiveExposure = hiveExposure
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
  $scope.create = function() {
    $http.post("/api/hive/create", $scope.hive).success(function (res) {
      $state.go("main.apiary.hive", {hive: res.id})
    })
  }
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

app.controller("inspectionController", ["$scope", "$http", "$stateParams", function($scope, $http, $stateParams) {
  $scope.inspection = {}
  $scope.getInspection = function() {
    $http.get("/api/hive/"+$stateParams.hive).success(function(res) {
      $scope.hive = res;
    })
  }
  $scope.getHive();

  $scope.getInspections = function() {
    $http.get("/api/inspection/hive/"+$stateParams.hive).success(function(res) {
      $scope.inspections = res;
    })
  }
  $scope.getInspections();
}])

app.controller("inspectionCreateController", ["$scope", "inspectionWeather", "inspectionState", "inspectionStrenght", "inspectionTemper", "levels", "weights", "conditions", "$http", "$stateParams",
function($scope, inspectionWeather, inspectionState, inspectionStrenght, inspectionTemper, levels, weights, conditions, $http, $stateParams) {
  $scope.inspection = {
    hive: $stateParams.hive
  }
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

  $scope.create = function() {
    $http.post("/api/inspection/create", $scope.inspection).success(function(res) {
      console.log(res);
    })
  }
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

app.controller("loginController", ["$scope", "$state", "$http", function($scope, $state, $http) {
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

app.controller("apiariesController", ["$scope", "$http", "apiaryQuestions", function($scope, $http, apiaryQuestions) {
  $scope.apiaries = [];
  $scope.selected = -1;
  var getApiaries = function () {
    $http.get("/api/apiary").success(function(res) {
      $scope.apiaries = res;
      matchQuestions($scope.apiaries);
    })
  }

  $scope.select = function(index) {
    if($scope.isSelected(index)) {
      $scope.selected = -1;
    } else {
      $scope.selected = index;
    }
  }

  $scope.isSelected = function(index){
    return $scope.selected == index;
  }
  getApiaries();

  var matchQuestions = function(apiaries) {
    apiaries.forEach(function(a) {
      a.questions = [];
      apiaryQuestions.forEach(function(q) {
        if(a[q.model]) {
          a.questions.push({
            string: q.string,
            value: a[q.model]
          })
        }
      })
    })
  }

}])
