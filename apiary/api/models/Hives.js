var ObjectID = require("mongodb");

module.exports = {
  attributes: {
    givenId: {
      type: "string"
    },

    // GPS
    lat: {
      type: 'number'
    },
    log: {
      type: 'number'
    },

    picture: {
      type: "objectid"
    },
    installationDate: {
      type: "date"
    },
    type: {
      model: "answer"
    },
    exposure: {
      model: "answer"
    }
  }
};
