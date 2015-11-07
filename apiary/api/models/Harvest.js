module.exports = {
  attributes: {
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
    smoler: {
      type: "boolean"
    },
    buckets: {
      type: "number"
    }
  }
};
