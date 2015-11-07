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
        foot: req.param("foot"),
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
  }
};
