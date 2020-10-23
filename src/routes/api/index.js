import usersRouter from "./auth.routes";
import { serve, setup } from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerDefinition from "../../docs/api-specification";
import express from "express";

const specs = swaggerJsdoc(swaggerDefinition);
const router = express.Router();
const prefix = "/api/v1";
const apiDocs = "/api/docs";
const specsConfig = setup(specs, {
  explorer: false,
  customSiteTitle: "In-Between API",
});

router.use(apiDocs, serve);
router.use(apiDocs, specsConfig);
router.use(prefix, usersRouter);

export default router;
