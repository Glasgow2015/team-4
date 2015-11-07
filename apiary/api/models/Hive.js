var ObjectID = require("mongodb");

module.exports = {
  attributes: {
    givenId: {
      type: "string"
    },

    user: {
      model: "User"
    },

    keepers: {
      collection: "User",
      via: "keepingHives"
    },

    apiary: {
      model: "Apiary"
    },

    sponsors: {
      collection: "User",
      via: "hives"
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
      type: "string"
    },
    exposure: {
      type: "string"
    }
  }
};