"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _path = _interopRequireDefault(require("path"));

var _childProcessPromise = require("child-process-promise");

var _config = _interopRequireDefault(require("../config"));

var _winston = _interopRequireDefault(require("../utils/winston"));

const spawnOptions = {
  cwd: _path.default.join(__dirname, "../.."),
  stdio: "inherit"
};

(async () => {
  // Strip our search params
  const {
    url
  } = _config.default.database;

  try {
    await (0, _childProcessPromise.spawn)("./node_modules/.bin/sequelize", ["db:migrate", `--url=${url}`], spawnOptions);

    _winston.default.info("*************************");

    _winston.default.info("Migration successful");
  } catch (err) {
    _winston.default.info("*************************");

    _winston.default.info("Migration failed. Error:", err.message);
  }

  process.exit(0);
})();