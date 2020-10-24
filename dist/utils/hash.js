"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _dotenv = require("dotenv");

(0, _dotenv.config)();

class Hash {
  generateSync(plainPassword) {
    return _bcrypt.default.hashSync(plainPassword, 10);
  }

  compareSync(plainPassword, hash) {
    return _bcrypt.default.compareSync(plainPassword, hash);
  }

}

var _default = new Hash();

exports.default = _default;