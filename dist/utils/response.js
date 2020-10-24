"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Responses {
  handleSuccess(statusCode, message, res, data = null) {
    return res.status(statusCode).json(data ? {
      status: "success",
      message,
      data
    } : {
      status: "success",
      message
    });
  }

  handleError(statusCode, message, res) {
    return res.status(statusCode).json({
      status: "error",
      message
    });
  }

}

var _default = new Responses();

exports.default = _default;