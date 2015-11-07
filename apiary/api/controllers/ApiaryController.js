module.exports = {
  create: function(req, res) {
    var lat = parseFloat(req.param("lat"));
    var log = parseFloat(req.param("log"));

    if (isNaN(lat) || isNaN(log)) {
      return res.send({
        error: "incorrect gps data received"
      });
    }

    var newApiary = {
      name: req.param("name"),

      user: req.user.id,

      // GPS
      lat: lat,
      log: log,

      startYear: new Date(req.param("date")),

      // questions
      environment: {
        water: req.param("water"),
        vegetationMiombo: req.param("miombo"),
        vegetationForests: req.param("forests"),
        vegetationGrass: req.param("grass"),
        vegetationForestPlantation: req.param("forestPlantation"),
        vegetationSisalPlantation: req.param("sisalPlantation"),
        vegetationOrchard: req.param("orchard"),
        vegetationMixed: req.param("mixed"),
        pesticides: req.param("pesticides")
      },
      accessibility: {
        vehicle: req.param("vehicle"),
        cycle: req.param("cycle"),
        foot: req.param("foot")
      },
      type: {
        natural: req.param("natural"),
        tree: req.param("tree"),
        breastHeight: req.param("height"),
        beeHouse: req.param("beeHouse"),
        badger: req.param("badger")
      }
    };

    Apiary.create(newApiary)
    .then(function(apiary){
      res.send(apiary);
    });
  },

  get: function(req, res) {
    Apiary.find({
      beekeepers: req.user.id
    }).then(_.identity)
    .catch(function(err) {
      sails.log.error("get", err);
      return {
        error: "Failed to get apiary"
      };
    }).then(res.send);
  },

  getOne: function(req, res) {
    Apiary.findOne({
      id: req.param("apiary"),
      beekeepers: req.user.id
    }).then(_.identity)
    .catch(function(err) {
      sails.log.error("getOne", err);
      return {
        error: "Failed to get apiary"
      };
    }).then(res.send);
  },

  addBeekeeper: function(req, res) {
    Apiary.findOne({
      id: req.param("apiary"),
      beekeepers: req.user.id
    }).then(function(apiary) {
      apiary.beekeepers.add(req.param("user"));
      return apiary.save();
    }).catch(function(err) {
      sails.log.error("addBeekeeper", err);
      return {
        error: "Failed to add beekeeper"
      };
    }).then(res.send);
  },

  removeBeekeeper: function(req, res) {
    Apiary.findOne({
      id: req.param("apiary"),
      beekeepers: req.user.id
    }).then(function(apiary) {
      apiary.beekeepers.remove(req.param("user"));
      return apiary.save();
    }).catch(function(err) {
      sails.log.error("addBeekeeper", err);
      return {
        error: "Failed to add beekeeper"
      };
    }).then(res.send);
  }
};