module.exports = {
  attributes: {
    creator: {
      model: "User"
    },
    date: {
      type: "date",
      defaultsTo: function() {
        return new Date();
      }
    },
    ripe: {
      type: "number"
    },
    beekeeperClothing: {
      type: "boolean"
    },
    assistantsClothing: {
      type: "boolean"
    },
    smoker: {
      type: "boolean"
    },
    buckets: {
      type: "number"
    }
  }
};
