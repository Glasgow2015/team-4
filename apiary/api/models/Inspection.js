module.exports = {
  attributes: {
    hive: {
      model: "hive"
    },
    givenHive: {
      type: "string"
    },
    inspector: {
      model: "User"
    },
    date: {
      type: "date",
      defaultsTo: function() {
        return new Date();
      }
    },
    weather: {
      type: "string"
    },
    state: {
      type: "string"
    },
    temper: {
      type: "string"
    },
    queens: {
      type: "string"
    },

    combCondition: {
      type: "json"
    },

    diseases: {
      type: "json"
    },

    hiveCondition: {
      type: "string"
    },

    tools: {
      type: "string"
    }
  }
};
