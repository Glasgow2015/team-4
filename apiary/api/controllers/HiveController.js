module.exports = {
  create: function(req, res) {
    var lat = parseFloat(req.param("lat"));
    var log = parseFloat(req.param("log"));

    if (isNaN(lat) || isNaN(log)) {
      return res.send({
        error: "incorrect gps data received"
      });
    }

    var newHive = {
      givenId: req.param("givenId"),

      user: req.user.id,

      // GPS
      lat: lat,
      log: log,

      installationDate: new Date(req.param("installDate")),
      type: req.param("type"),
      exposure: req.param("exposure")
    };

    return Apiary.findOne(req.param("apiary"))
    .then(function(apiary) {
      newHive.apiary = apiary.id;
      return newHive;
    })
    .then(Hive.create)
    .catch(function(err) {
      return {
        error: "Failed to create a new hive"
      };
    })
    .then(res.send);
  },

  addSponsor: function(req, res) {
    Hive.findOne(req.param("hive"))
    .then(function(hive) {
      hive.sponsors.add(req.param("newSponsor"));
      return hive.save();
    }).catch(function(err) {
      sails.log.error("addSponsor", err);
      return {
        error: "Failed to add a sponsor"
      };
    }).then(res.send);
  },

  removeSponsor: function(req, res) {
    Hive.findOne(req.param("hive"))
    .then(function(hive) {
      hive.sponsors.remove(req.param("newSponsor"));
      return hive.save();
    }).catch(function(err) {
      sails.log.error("removeSponsor", err);
      return {
        error: "Failed to remove a sponsor"
      };
    }).then(res.send);
  },

  get: function(req, res) {

  },

  getOne: function(req, res) {

  }
};
