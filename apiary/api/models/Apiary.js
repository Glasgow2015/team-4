module.exports = {
  attributes: {
    creator: {
      model: "User"
    },
    name: {
      type: 'string'
    },

    hives: {
      collection: "Hive",
      via: "apiary"
    },

    // GPS
    lat: {
      type: 'number'
    },
    log: {
      type: 'number'
    },

    startYear: {
      type: 'date'
    },

    // questions
    environment: {
      type: 'json'
    },
    accessibility: {
      type: 'json'
    },
    type: {
      type: 'json'
    }
  }
};
