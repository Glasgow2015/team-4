'use strict';

var mongo = require("mongodb");
var Grid = require('gridfs-stream');
var Promise = require("bluebird");

var ObjectID = require("mongodb").ObjectID;

var mongohost = process.env.MONGO_PORT_27017_TCP_ADDR || 'localhost';

var MongoClient = mongo.MongoClient;

var grid = {};

if (process.env.NODE_ENV === 'test') {
  // Create a dummy fs that will return with the err value in the callback set.
  var error = function(input, callback) {
    callback(new Error('No mongo available: Enviroment variable NODE_ENV is set to test. Are you trying to test file uploads?'));
  };

  grid.fs = {};

  mongo.GridStore.prototype.forEach(function(func) {
    grid.fs[func] = error;
  });
} else {
  MongoClient.connect("mongodb://" + mongohost + "/fileDB", function(err, db) {
    if (err) {
      throw new Error("DB not found");
    }

    grid.fs = {
      get: function(fileId, callback) {
        return new Promise(function(resolve, reject) {
            var file = new mongo.GridStore(db, ObjectID(fileId), 'r');
            file.open(function(err, file) {
              if (err) return reject(err);
              resolve(file);
            });
          }).then(function(file) {
            file.seek(0, function() {
              file.read(function(err, data) {
                if (err) return callback && callback(err);
                callback && callback(null, data);
              });
            });
          })
          .catch(function(err) {
            callback && callback(err)
          });
      },
      put: function(fileData, options, callback) {
        if (!options) {
          return callback(new Error("Missing options"));
        }

        return new Promise(function(resolve, reject) {
            var file = new mongo.GridStore(db, options.filename, 'w', options);
            file.open(function(err, file) {
              if (err) return reject(err);
              resolve(file);
            });
          }).then(function(file) {
            file.write(fileData, function(err) {
              if (err) return callback && callback(err);
              file.close(function(err) {
                if (err) return callback && callback(err);
                callback && callback(null);
              });
            });
          })
          .catch(function(err) {
            callback && callback(err);
          });
      },
      delete: function(fileId, callback) {
        return new Promise(function(resolve, reject) {
            var file = new mongo.GridStore(db, Utils.ObjectID(fileId), 'r');
            file.open(function(err, file) {
              if (err) return reject(err);
              resolve(file);
            });
          }).then(function(file) {
            file.unlink(function(err) {
              if (err) return callback && callback(err);
              callback && callback(null);
            });
          })
          .catch(function(err) {
            callback && callback(err);
          });
      }
    };

    grid.fs.streams = Grid(db, mongo);
  });
}

module.exports = {
  mongohost: mongohost,
  grid: grid,
  isId: function(id) {
    return /^[a-fA-F0-9]{24}$/.test(id);
  }
};
