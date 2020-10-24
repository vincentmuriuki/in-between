"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _index = _interopRequireDefault(require("../config/index"));

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "In Between",
      version: "1.0.0",
      description: "Making company travel and accomodation.",
      license: {
        name: "MIT",
        url: "https://choosealicense.com/licenses/mit/"
      },
      contact: {
        name: "Plaitnum",
        url: "https://plaitnum.co.ke"
      }
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [{
      bearerAuth: []
    }],
    servers: [{
      url: "https://boondocks-bn-backend.herokuapp.com/api/v1",
      description: "Production server"
    }, {
      url: "https://boondocks-bn-backend-staging.herokuapp.com/api/v1",
      description: "Staging Server"
    }, {
      url: `http://localhost:${_index.default.PORT}/api/v1`,
      description: "Local Host"
    }]
  },
  apis: [(0, _path.resolve)(__dirname, "../docs/resources/*.yaml"), (0, _path.resolve)(__dirname, "../routes/api/*.js")]
};
var _default = options;
exports.default = _default;