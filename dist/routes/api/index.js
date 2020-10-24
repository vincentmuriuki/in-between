"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _auth = _interopRequireDefault(require("./auth.routes"));

var _swaggerUiExpress = require("swagger-ui-express");

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var _apiSpecification = _interopRequireDefault(require("../../docs/api-specification"));

var _express = _interopRequireDefault(require("express"));

const specs = (0, _swaggerJsdoc.default)(_apiSpecification.default);

const router = _express.default.Router();

const prefix = "/api/v1";
const apiDocs = "/api/docs";
const specsConfig = (0, _swaggerUiExpress.setup)(specs, {
  explorer: false,
  customSiteTitle: "In-Between API"
});
router.use(apiDocs, _swaggerUiExpress.serve);
router.use(apiDocs, specsConfig);
router.use(prefix, _auth.default);
var _default = router;
exports.default = _default;