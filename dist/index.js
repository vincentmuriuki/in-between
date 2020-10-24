"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.io = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = require("body-parser");

require("dotenv/config");

var _errorhandler = _interopRequireDefault(require("errorhandler"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _yamljs = _interopRequireDefault(require("yamljs"));

var _fs = _interopRequireDefault(require("fs"));

var _passport = _interopRequireDefault(require("passport"));

var _config2 = _interopRequireDefault(require("./config"));

var _morgan = _interopRequireDefault(require("morgan"));

var _winston = _interopRequireDefault(require("./utils/winston"));

var _chalk = _interopRequireDefault(require("chalk"));

var _socket = _interopRequireDefault(require("socket.io"));

var _jwt = _interopRequireDefault(require("./utils/jwt"));

var _response = _interopRequireDefault(require("./utils/response"));

var _index = _interopRequireDefault(require("./routes/index"));

const isDevelopment = _config2.default.env; // Global app object

const app = (0, _express.default)();
app.use(_passport.default.initialize());

_passport.default.serializeUser((user, done) => done(null, user));

_passport.default.deserializeUser((user, done) => done(null, user));

app.use((0, _morgan.default)("common", {
  stream: _fs.default.createWriteStream(".logs/request.log", {
    flags: "a"
  })
}));
app.use((0, _morgan.default)("dev"));
app.use((0, _cors.default)());
app.use((0, _bodyParser.urlencoded)({
  extended: false
}));
app.use((0, _bodyParser.json)());
app.set("port", _config2.default.PORT || 3000);
const server = app.listen(app.get("port"), () => {
  _winston.default.info(`Express running → PORT ${server.address().port}, ${_chalk.default.green("✓")}`);
});
const io = (0, _socket.default)(server); // chat functionality
// chat(io);

exports.io = io;
const connectedClients = {};
io.use(async (socket, next) => {
  const {
    token
  } = socket.handshake.query;
  const userData = await _jwt.default.decodeToken(token);

  if (!userData.error) {
    const clientKey = Number.parseInt(userData.userId, 10);
    connectedClients[clientKey] = connectedClients[clientKey] || [];
    connectedClients[clientKey].push(socket.id);
  }

  next();
});
app.use((req, res, next) => {
  req.io = io;
  req.connectedClients = connectedClients;
  next();
});
app.get("/", (req, res) => _response.default.handleSuccess(200, "Welcome to In-Between", res));
app.use(_index.default);
app.use((req, res) => _response.default.handleError(404, "Route not found", res)); // development error handler middleware

app.use((err, req, res, next) => {
  if (isDevelopment !== "development") {
    next(err);
  }

  _winston.default.error(`${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}
    - Stack: ${err.stack}`);

  return _response.default.handleError(err.statusCode || 500, `${err.message}.`, res);
}); // Production and testing error handler
// eslint-disable-next-line no-unused-vars
// app.use((err, req, res) => {
//   logger.error(`${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${
//     req.ip
//   } - Stack: ${err.stack}`);
//   return Responses.handleError(err.statusCode || 500, err.message, res);
// });
// process.on('')

var _default = app;
exports.default = _default;