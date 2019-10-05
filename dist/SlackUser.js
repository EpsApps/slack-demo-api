"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _request = _interopRequireDefault(require("request"));

var config = _interopRequireWildcard(require("./config"));

var _error = require("./error");

var _MongoDBObject = _interopRequireDefault(require("./MongoDBObject"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SlackUser extends _MongoDBObject.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "collection", 'slack-users');
  }

  /**
   * @todo add functionality to query all users if initial payload returns only a subset of users
   */
  static getUsersFromSlack() {
    return new Promise((resolve, reject) => {
      _request.default.get('https://slack.com/api/users.list', {
        auth: {
          bearer: config.SLACK_BEARER_TOKEN
        }
      }, (error, response, body) => {
        if (error) {
          reject({
            error: _error.INTERAL_SERVER_ERROR
          });
        } else {
          resolve(body);
        }
      });
    });
  }

}

exports.default = SlackUser;