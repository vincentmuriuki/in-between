"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _winston = require("winston");

const {
  combine,
  timestamp,
  simple,
  json
} = _winston.format;
const logger = (0, _winston.createLogger)({
  format: combine(timestamp(), json()),
  transports: [new _winston.transports.Console({
    format: simple()
  }), new _winston.transports.File({
    filename: ".logs/error.log",
    level: "error"
  }), new _winston.transports.File({
    filename: ".logs/info.log",
    level: "info"
  })],
  exitOnError: false
});
var _default = logger;
exports.default = _default;