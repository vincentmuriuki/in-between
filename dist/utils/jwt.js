"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

class tokenizer {
  async signToken(user) {
    return _jsonwebtoken.default.sign({
      email: user.email,
      name: user.firstName,
      userId: user.id,
      verified: user.isVerified,
      role: user.role
    }, process.env.SECRET, {
      expiresIn: "24h"
    });
  }

  async decodeToken(token) {
    const data = _jsonwebtoken.default.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) return {
        error: err.message
      };
      return decoded;
    });

    return data;
  }

}

var _default = new tokenizer();

exports.default = _default;