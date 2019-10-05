"use strict";

var _SlackUser = _interopRequireDefault(require("../SlackUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function importSlackUsers() {
  try {
    let response = JSON.parse((await _SlackUser.default.getUsersFromSlack()));
    let slackUser = new _SlackUser.default();
    await slackUser.deleteMany();
    await slackUser.insertMany(response.members);
    console.log('imported users: ');
    console.log((await slackUser.findMany()));
  } catch (e) {
    console.log(e);
  }
}

importSlackUsers();