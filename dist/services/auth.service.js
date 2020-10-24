"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../models/User"));

class UserService {
  async finduserByEmail(email) {
    const user = _User.default.findOne({
      where: {
        email
      }
    });

    if (!user) return null;
    const lastLogin = new Date().toISOString();
    await user.update({
      lastLogin
    }, {
      where: {
        email
      }
    });
    return user;
  }

}

var _default = new UserService();

exports.default = _default;