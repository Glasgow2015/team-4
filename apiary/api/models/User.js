var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    username  : { type: 'string', unique: true },
    passports : { collection: 'Passport', via: 'user' },
    hives: {
      collection: "Hive",
      via: "sponsors"
    },
    type: {
      type: 'string'
    },
    keeping: {
      collection: "Apiary"
    },
    keepingHives: {
      collection: "Hive"
    }
  }
};

module.exports = User;
