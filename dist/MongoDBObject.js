"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongodb = require("mongodb");

var _error = require("./error");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class MongoDBObject {
  constructor() {
    _defineProperty(this, "url", 'mongodb://localhost:27017');

    _defineProperty(this, "dbName", 'workos-demo');

    _defineProperty(this, "collection", 'documents');
  }

  insertMany(objects) {
    return new Promise((resolve, reject) => {
      _mongodb.MongoClient.connect(this.url, (error, client) => {
        if (error) {
          client.close();
          reject({
            error: _error.INTERAL_SERVER_ERROR
          });
        }

        const db = client.db(this.dbName);
        const collection = db.collection(this.collection);
        collection.insertMany(objects, (error, result) => {
          if (error) {
            client.close();
            reject({
              error: _error.INTERAL_SERVER_ERROR
            });
          } else {
            client.close();
            resolve(result);
          }
        });
      });
    });
  }

  insertOne(object) {
    return new Promise((resolve, reject) => {
      _mongodb.MongoClient.connect(this.url, (error, client) => {
        if (error) {
          client.close();
          reject({
            error: _error.INTERAL_SERVER_ERROR
          });
        }

        const db = client.db(this.dbName);
        const collection = db.collection(this.collection);
        collection.insertOne(object, (error, result) => {
          if (error) {
            client.close();
            reject({
              error: _error.INTERAL_SERVER_ERROR
            });
          } else {
            client.close();
            resolve(result);
          }
        });
      });
    });
  }

  findOne(query = {}) {
    return new Promise((resolve, reject) => {
      _mongodb.MongoClient.connect(this.url, (error, client) => {
        if (error) {
          client.close();
          reject({
            error: _error.INTERAL_SERVER_ERROR
          });
        }

        const db = client.db(this.dbName);
        const collection = db.collection(this.collection);
        collection.findOne(query).toArray((error, objects) => {
          if (error) {
            client.close();
            reject({
              error: _error.INTERAL_SERVER_ERROR
            });
          } else {
            client.close();
            resolve(objects);
          }
        });
      });
    });
  }

  findMany(query = {}) {
    return new Promise((resolve, reject) => {
      _mongodb.MongoClient.connect(this.url, (error, client) => {
        if (error) {
          client.close();
          reject({
            error: _error.INTERAL_SERVER_ERROR
          });
        }

        const db = client.db(this.dbName);
        const collection = db.collection(this.collection);
        collection.find(query).toArray((error, objects) => {
          if (error) {
            client.close();
            reject({
              error: _error.INTERAL_SERVER_ERROR
            });
          } else {
            client.close();
            resolve(objects);
          }
        });
      });
    });
  }

  updateOne(query = {}, object = {}) {
    return new Promise((resolve, reject) => {
      _mongodb.MongoClient.connect(this.url, (error, client) => {
        if (error) {
          client.close();
          reject({
            error: _error.INTERAL_SERVER_ERROR
          });
        }

        const db = client.db(this.dbName);
        const collection = db.collection(this.collection);
        collection.updateOne(query, object, (error, result) => {
          if (error) {
            client.close();
            reject({
              error: _error.INTERAL_SERVER_ERROR
            });
          } else {
            client.close();
            resolve(result);
          }
        });
      });
    });
  }

  deleteMany(query = {}) {
    return new Promise((resolve, reject) => {
      _mongodb.MongoClient.connect(this.url, (error, client) => {
        if (error) {
          client.close();
          reject({
            error: _error.INTERAL_SERVER_ERROR
          });
        }

        const db = client.db(this.dbName);
        const collection = db.collection(this.collection);
        collection.deleteMany(query, (error, result) => {
          if (error) {
            client.close();
            reject({
              error: _error.INTERAL_SERVER_ERROR
            });
          } else {
            client.close();
            resolve(result);
          }
        });
      });
    });
  }

}

exports.default = MongoDBObject;