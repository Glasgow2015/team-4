module.exports = {
  create: function(req, res) {
    var lat = parseFloat(req.param("lat"));
    var lon = parseFloat(req.param("lon"));

    var year = parseInt(req.param("year"));

    if (isNaN(lat) || isNaN(lon) || isNaN(year)) {
      return res.ok({
        error: "incorrect gps data received"
      });
    }
    var newApiary = {
      name: req.param("name"),

      user: req.user.id,

      months: req.param("months"),

      // GPS
      lat: lat,
      lon: lon,

      startYear: year,

      // questions
      water: req.param("water"),
      miombo: req.param("miombo"),
      forests: req.param("forests"),
      grass: req.param("grass"),
      forestPlantation: req.param("forestPlantation"),
      sisalPlantation: req.param("sisalPlantation"),
      orchard: req.param("orchard"),
      mixed: req.param("mixed"),
      pesticides: req.param("pesticides"),

      vehicle: req.param("vehicle"),
      cycle: req.param("cycle"),
      foot: req.param("foot"),

      natural: req.param("natural"),
      tree: req.param("tree"),
      height: req.param("height"),
      beeHouse: req.param("beeHouse"),
      badger: req.param("badger")
    };

    Apiary.create(newApiary)
    .then(function(apiary){
      res.ok(apiary);
    }).catch(function(err) {
      sails.log.error("create", err);
      res.ok({
        error: "Failed to create apiary"
      });
    });
  },

  get: function(req, res) {
    Apiary.find({
      or: [{
        beekeepers: req.user.id
      }, {
        user: req.user.id
      }]
    }).then(_.identity)
    .catch(function(err) {
      sails.log.error("get", err);
      return {
        error: "Failed to get apiary"
      };
    }).then(res.ok);
  },

  getOne: function(req, res) {
    Apiary.findOne({
      id: req.param("apiary"),
      or: [{
        beekeepers: req.user.id
      }, {
        user: req.user.id
      }]
    }).then(_.identity)
    .catch(function(err) {
      sails.log.error("getOne", err);
      return {
        error: "Failed to get apiary"
      };
    }).then(res.ok);
  },

  addBeekeeper: function(req, res) {
    Apiary.findOne({
      id: req.param("apiary"),
      or: [{
        beekeepers: req.user.id
      }, {
        user: req.user.id
      }]
    }).then(function(apiary) {
      apiary.beekeepers.add(req.param("user"));
      return apiary.save();
    }).catch(function(err) {
      sails.log.error("addBeekeeper", err);
      return {
        error: "Failed to add beekeeper"
      };
    }).then(res.ok);
  },

  removeBeekeeper: function(req, res) {
    Apiary.findOne({
      id: req.param("apiary"),
      or: [{
        beekeepers: req.user.id
      }, {
        user: req.user.id
      }]
    }).then(function(apiary) {
      apiary.beekeepers.remove(req.param("user"));
      return apiary.save();
    }).catch(function(err) {
      sails.log.error("addBeekeeper", err);
      return {
        error: "Failed to add beekeeper"
      };
    }).then(res.ok);
  }
};
