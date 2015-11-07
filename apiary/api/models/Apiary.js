module.exports = {
  attributes: {
    name: {
      type: 'string'
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
    }
  }
};
