"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * use to wrap around controller to avoid try catch blocks
 * @param {function} fn
 * @returns {function} next
 */
const catchErrors = fn => (req, res, next) => fn(req, res, next).catch(next);

var _default = catchErrors;
exports.default = _default;