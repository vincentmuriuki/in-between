"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _path = _interopRequireWildcard(require("path"));

var _sequelize = require("sequelize");

var _config = _interopRequireDefault(require("../config"));

/* eslint-disable arrow-parens */
const basename = (0, _path.basename)(__filename);
const config = _config.default.database;
const db = {};
const sequelize = new _sequelize.Sequelize(config.url, {
  logging: false
});
(0, _fs.readdirSync)(__dirname).filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js').forEach(file => {
  // const model = sequelize.import(join(__dirname, file));
  const model = require(_path.default.join(__dirname, file))(sequelize, _sequelize.Sequelize.DataTypes);

  db[model.name] = model;
});
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = _sequelize.Sequelize;
var _default = db;
exports.default = _default;