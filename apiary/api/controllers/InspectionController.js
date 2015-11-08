module.exports = {
  create: function(req, res) {
    return Hive.findOne(req.param("hive"))
    .then(function(hive) {
      return {
        hive: hive.id,
        givenHive: hive.givenId,
        inspector: req.user.id,
        date: new Date(req.param("date")),
        weather: req.param("weather"),
        state: req.param("state"),
        temper: req.param("temper"),
        queens: req.param("queens"),

        honey: req.param("honey"),
        pollen: req.param("pollen"),

        beetles: req.param("beetles"),
        mites: req.param("mites"),
        ants: req.param("ants"),
        chalk: req.param("chalk"),

        hiveCondition: req.param("hiveCondition"),
        tools: req.param("tools")
      };
    }).then(function(newInspection) {
      return Inspection.create(newInspection);
    }).catch(function(err) {
      sails.log.error("Failed to create new Inspection", err);
      return {
        error: "Failed to create new Inspection"
      };
    }).then(res.ok);
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
      return Inspection.find({
        hive: hive.id
      });
    }).catch(function(err) {
      sails.log.error("getByHive", err);
      return {
        error: "Failed to get Inspections"
      };
    }).then(res.ok);
  }
};
