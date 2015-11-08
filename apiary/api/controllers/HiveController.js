module.exports = {
  create: function(req, res) {
    var lat = parseFloat(req.param("lat"));
    var lon = parseFloat(req.param("lon"));

    if (isNaN(lat) || isNaN(lon)) {
      return res.ok({
        error: "incorrect gps data received"
      });
    }

    var newHive = {
      givenId: req.param("givenId"),

      user: req.user.id,

      // GPS
      lat: lat,
      lon: lon,

      installationDate: new Date(req.param("date")),
      type: req.param("type"),
      exposure: req.param("exposure")
    };

    return Apiary.findOne(req.param("apiary"))
    .then(function(apiary) {
      newHive.apiary = apiary.id;
      return newHive;
    })
    .then(function(newHive) {
      var file = req.file("file");
      if (file) {
        return new Promise(function(resolve, reject) {
          file.upload(function(err, file) {
            file = file[0];
            var writeStream = Grid.grid.fs.streams.createWriteStream();
            writeStream.on('close', function() {
              console.log(arguments);
              resolve(newHive);
            });
            Utils.fs.createReadStream(file.fd).pipe(writeStream);
          });
        });
      } else {
        return newHive;
      }
    })
    .then(Hive.create)
    .catch(function(err) {
      return {
        error: "Failed to create a new hive"
      };
    })
    .then(res.ok);
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
    }).then(res.ok);
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
    }).then(res.ok);
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
    }).then(res.ok);
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
    }).then(res.ok);
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
    .then(res.ok);
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
    .then(_.identity)
    .catch(function(err) {
      sails.log.error("getOne", err);
      return {
        error: "Failed to find your hives"
      };
    })
    .then(res.ok);
  }
};
