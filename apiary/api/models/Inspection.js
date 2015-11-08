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

    //Comb Condition
    honey: {
      type: "string"
    },
    pollen: {
      type: "string"
    },

    //diseases
    beetles: {
      type: "string"
    },
    mites: {
      type: "string"
    },
    ants: {
      type: "string"
    },
    chalk: {
      type: "string"
    },

    hiveCondition: {
      type: "string"
    },

    tools: {
      type: "string"
    }
  }
};
