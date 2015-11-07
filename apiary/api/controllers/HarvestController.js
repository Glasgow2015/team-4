module.exports = {
  create: function(req, res) {
    return Hive.findOne({
      id: req.param("hive"),
      or: [{
        user: req.user.id
      }, {
        keepers: req.user.id
      }]
    }).then(function(hive) {
      var ripe = parseFloat(req.param("ripe"));
      var buckets = parseFloat(req.param("buckets"));
      if (isNaN(ripe) || isNaN(buckets)) {
        return res.ok({
          error: "Invalid number sent, either ripe or buckets"
        });
      }
      var newHarvest = {
        hive: hive.id,
        creator: req.user.id,
        date: new Date(req.param("date")),
        ripe: ripe,
        beekeeperClothing: !!req.param("beekeeper"),
        assistantsClothing: !!req.param("assistants"),
        smoker: !!req.param("smoker"),
        buckets: buckets
      };

      return Harvest.create(newHarvest);
    })
    .catch(function(err) {
      sails.log.error("create", err);
      return {
        error: "Failed to create harvest"
      };
    })
    .then(res.ok);
  },

  getByHive: function(req, res) {
    return Hive.findOne({
      id: req.param("hive"),
      or: [{
        user: req.user.id
      }, {
        keepers: req.user.id
      }]
    }).then(function(hive) {
      return Harvest.find({
        hive: hive.id
      });
    }).catch(function(err) {
      sails.log.error("getByHive", err);
      return {
        error: "Failed to get Harvests"
      };
    }).then(res.ok);
  }
};
