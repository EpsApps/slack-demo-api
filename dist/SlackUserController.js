"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SlackUser = _interopRequireDefault(require("./SlackUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SlackUserController {
  static async findAll(request, response) {
    let slackUser = new _SlackUser.default();
    let result = await slackUser.findMany();

    if (result && !result.error) {
      response.status(200).json(result);
    } else {
      response.status(400).json({
        error: result.error
      });
    }
  }

}

exports.default = SlackUserController;