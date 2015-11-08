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
    vegetationMiombo: {
      type: 'string'
    },
    vegetationForests: {
      type: 'string'
    },
    vegetationGrass: {
      type: 'string'
    },
    vegetationForestPlantation: {
      type: 'string'
    },
    vegetationSisalPlantation: {
      type: 'string'
    },
    vegetationOrchard: {
      type: 'string'
    },
    vegetationMixed: {
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
    breastHeight: {
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
