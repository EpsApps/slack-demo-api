"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SlackAPI = _interopRequireDefault(require("./SlackAPI"));

var _SlackEvent = _interopRequireDefault(require("./SlackEvent"));

var ERROR = _interopRequireWildcard(require("./error"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SlackEventController {
  static async ingestEvent(request, response) {
    try {
      if (!request || !request.body) {
        response.status(400).json({
          error: ERROR.INTERNAL_SERVER_ERROR
        });
        return;
      }

      let body = request.body;

      if (!_SlackAPI.default.tokenIsValid(body)) {
        response.status(400).json({
          error: ERROR.INVALID_TOKEN
        });
        return;
      }

      let authentificationParams = _SlackEvent.default.getAuthentificationParams(body);

      if (authentificationParams) {
        response.status(200).json(authentificationParams);
        return;
      }

      let ingestionResult = await _SlackEvent.default.ingestEvent(body);

      if (ingestionResult && !ingestionResult.error) {
        response.status(200).json({
          success: true
        });
        return;
      } else {
        response.status(400).json({
          error: ingestionResult.error
        });
        return;
      }
    } catch (e) {
      response.status(400);
    }
  }

}

exports.default = SlackEventController;