"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _hash = _interopRequireDefault(require("../utils/hash"));

var _jwt = _interopRequireDefault(require("../utils/jwt"));

var _response = _interopRequireDefault(require("../utils/response"));

var _auth = _interopRequireDefault(require("../services/auth.service"));

var _models = _interopRequireDefault(require("../models"));

class UserController {
  async createUser(req, res) {
    /**
     * @param firstName
     * @param lastName
     * @param password
     */
    const hashedPassword = _hash.default.generateSync(req.body.password);

    const userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashedPassword,
      email: req.body.email
    };
    const user = await _models.default.users.create(userData);
    const token = await _jwt.default.signToken(user);
    const data = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      token
    };
    return _response.default.handleSuccess(201, "success", res, data);
  }

  async findUser(req, res) {
    const user = _auth.default.finduserByEmail(req.body.email);

    if (!user) return _response.default.handleError(404, "user does not exist", res);

    if (!_hash.default.compareSync(req.body.password, user.password)) {
      return _response.default.handleError(400, "invalid credentials", res);
    }

    const token = await _jwt.default.signToken(user);
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      token
    };
    return _response.default.handleSuccess(200, "success", res, data);
  }

  async verifyAccount(req, res) {
    const user = _User.default.findOne({
      where: {
        id: req.params.id
      }
    });

    await user.update({
      isVerified: true
    }, {
      where: {
        wmail: user.email
      }
    });
    return res.status(200).redirect("/");
  }

}

var _default = new UserController();

exports.default = _default;