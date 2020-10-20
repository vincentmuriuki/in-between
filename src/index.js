import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import errorHandler from "errorhandler";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

// Global app object
const app = express();

const swaggerDocument = YAML.load(`${process.cwd()}/src/docs/docs.yaml`);
const isProduction = process.env.NODE_ENV == "production";

app.use(cors());
app.use(require("morgan")("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("method-override")());

if (!isProduction) {
  app.use(errorHandler());
}
// API versioning
// app.use('/api/v1', router)

app.get("/", (req, res) =>
  res.status(200).send("Welcome to in-between for the creative")
);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

// global error handler
app.use((err, req, res, next) => {
  res.status(err.status).send(err.message);
  next();
});

export default app;
