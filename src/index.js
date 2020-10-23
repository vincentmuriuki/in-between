import express from "express";
import cors from "cors";
import { urlencoded, json } from "body-parser";
import "dotenv/config";
import errorHandler from "errorhandler";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import fs from "fs";
import passport from "passport";
import config from "./config";
import morganLogger from "morgan";
import logger from "./utils/winston";
import chalk from "chalk";
import socketIo from "socket.io";
import jwt from "./utils/jwt";
import Responses from "./utils/response";
import router from "./routes/index";

const isDevelopment = config.env;

// Global app object
const app = express();

app.use(passport.initialize());
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
app.use(
  morganLogger("common", {
    stream: fs.createWriteStream(".logs/request.log", { flags: "a" }),
  })
);

app.use(morganLogger("dev"));
app.use(cors());

app.use(urlencoded({ extended: false }));
app.use(json());

app.set("port", config.PORT || 3000);

const server = app.listen(app.get("port"), () => {
  logger.info(
    `Express running → PORT ${server.address().port}, ${chalk.green("✓")}`
  );
});

export const io = socketIo(server);

// chat functionality
// chat(io);

const connectedClients = {};
io.use(async (socket, next) => {
  const { token } = socket.handshake.query;
  const userData = await jwt.decodeToken(token);
  if (!userData.error) {
    const clientKey = Number.parseInt(userData.userId, 10);
    connectedClients[clientKey] = connectedClients[clientKey] || [];
    connectedClients[clientKey].push(socket.id);
  }
  next();
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedClients = connectedClients;
  next();
});

app.get("/", (req, res) =>
  Responses.handleSuccess(200, "Welcome to In-Between", res)
);
app.use(router);
app.use((req, res) => Responses.handleError(404, "Route not found", res));
// development error handler middleware
app.use((err, req, res, next) => {
  if (isDevelopment !== "development") {
    next(err);
  }
  logger.error(`${err.statusCode || 500} - ${err.message} - ${
    req.originalUrl
  } - ${req.method} - ${req.ip}
    - Stack: ${err.stack}`);
  return Responses.handleError(err.statusCode || 500, `${err.message}.`, res);
});

// Production and testing error handler
// eslint-disable-next-line no-unused-vars
// app.use((err, req, res) => {
//   logger.error(`${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${
//     req.ip
//   } - Stack: ${err.stack}`);
//   return Responses.handleError(err.statusCode || 500, err.message, res);
// });

// process.on('')

export default app;
