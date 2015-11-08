module.exports = {
  attributes: {
    creator: {
      model: "User"
    },
    name: {
      type: 'string'
    },

    months: {
      type: 'json'
    },

    beekeepers: {
      collection: "User",
      via: "keeping"
    },

    hives: {
      collection: "Hive",
      via: "apiary"
    },

    // GPS
    lat: {
      type: 'float'
    },
    log: {
      type: 'float'
    },

    startYear: {
      type: 'date'
    },

    // questions
    //environment
    water: {
      type: 'string'
    },
    miombo: {
      type: 'string'
    },
    forests: {
      type: 'string'
    },
    grass: {
      type: 'string'
    },
    forestPlantation: {
      type: 'string'
    },
    sisalPlantation: {
      type: 'string'
    },
    orchard: {
      type: 'string'
    },
    mixed: {
      type: 'string'
    },
    pesticides: {
      type: 'string'
    },

    //accessibility

    vehicle: {
      type: 'string'
    },
    cycle: {
      type: 'string'
    },
    foot: {
      type: 'string'
    },

    //type
    natural: {
      type: 'string'
    },
    tree: {
      type: 'string'
    },
    height: {
      type: 'string'
    },
    beeHouse: {
      type: 'string'
    },
    badger: {
      type: 'string'
    }
  }
};
