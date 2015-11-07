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
    Hive.findOne({
      id: req.param("hive"),
      user: req.user.id
    })
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
    Hive.findOne({
      id: req.param("hive"),
      user: req.user.id
    })
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

  addKeeper: function(req, res) {
    Hive.findOne({
      id: req.param("hive"),
      user: req.user.id
    })
    .then(function(hive) {
      hive.keepers.add(req.param("newSponsor"));
      return hive.save();
    }).catch(function(err) {
      sails.log.error("addSponsor", err);
      return {
        error: "Failed to add a sponsor"
      };
    }).then(res.send);
  },

  removeKeeper: function(req, res) {
    Hive.findOne({
      id: req.param("hive"),
      user: req.user.id
    })
    .then(function(hive) {
      if (!hive) {
        throw new Error("No hive found");
      }
      hive.keepers.remove(req.param("newSponsor"));
      return hive.save();
    }).catch(function(err) {
      sails.log.error("removeSponsor", err);
      return {
        error: "Failed to remove a sponsor"
      };
    }).then(res.send);
  },

  getByApiary: function(req, res) {
    Apiary.findOne(req.param("apiary"))
    .then(function(apiary) {
      return Hive.find({
        apiary: apiary.id,
        or: [{
          user: req.user.id
        }, {
          keepers: req.user.id
        }]
      });
    })
    .catch(function(err) {
      sails.log.error("getByApiary", err);
      return {
        error: "Failed to get hives by apiary"
      };
    })
    .then(res.send);
  },

  getOne: function(req, res) {
    Hive.findOne({
      id: req.param("hive"),
      or: [{
        user: req.user.id
      }, {
        keepers: req.user.id
      }]
    })
    .then(function(item) {
      return item;
    })
    .catch(function(err) {
      sails.log.error("getOne", err);
    })
    .then(res.send);
  }
};
