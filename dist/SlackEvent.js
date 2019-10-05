"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SlackUser = _interopRequireDefault(require("./SlackUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EVENT_TYPE_USER_CHANGE = 'user_change';
const EVENT_TYPE_TEAM_JOIN = 'team_join';

class SlackEvent {
  /**
   * returns parameters to authenticate the server with Slack
   * @param {*} body 
   */
  static getAuthentificationParams(body) {
    if (body.challenge) {
      return {
        challenge: body.challenge
      };
    }

    return null;
  }

  static async ingestEvent(body) {
    let event = body.event;
    let slackUser = new _SlackUser.default();

    switch (event.type) {
      case EVENT_TYPE_USER_CHANGE:
        return await slackUser.updateOne({
          id: {
            $eq: event.user.id
          }
        }, {
          $set: event.user
        });

      case EVENT_TYPE_TEAM_JOIN:
        return await slackUser.insertOne(event.user);
    }
  }

}

exports.default = SlackEvent;