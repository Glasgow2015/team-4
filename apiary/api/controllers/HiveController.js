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

    Hive.create(newHive)
    .then(function(hive) {
      return res.send(hive);
    });
  }
};
