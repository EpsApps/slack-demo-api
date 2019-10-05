"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _SlackEventController = _interopRequireDefault(require("../SlackEventController"));

var _SlackUserController = _interopRequireDefault(require("../SlackUserController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function server() {
  let app = (0, _express.default)();
  app.use((0, _cors.default)());
  let port = process.env.PORT || 8081;
  app.use(_bodyParser.default.urlencoded({
    extended: true
  }));
  app.use(_bodyParser.default.json());
  app.post('/slack/event', _SlackEventController.default.ingestEvent);
  app.get('/slack/user', _SlackUserController.default.findAll);
  app.listen(port, () => console.log(`Server is listening on port: ${port}`));
}

server();