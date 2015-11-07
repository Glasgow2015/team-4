module.exports = {
  create: function(req, res) {
    var ripe = parseFloat(req.param("ripe"));
    var buckets = parseFloat(req.param("buckets"));
    if (isNaN(ripe) || isNaN(buckets)) {
      return res.send({
        error: "Invalid number sent, either ripe or buckets"
      });
    }
    var newHarvest = {
      creator: req.user.id,
      date: new Date(req.param("date")),
      ripe: ripe,
      beekeeperClothing: !!req.param("beekeeper"),
      assistantsClothing: !!req.param("assistants"),
      smoker: !!req.param("smoker"),
      buckets: buckets
    };

    return Harvest.create(newHarvest)
    .then(res.send);
  }
};
