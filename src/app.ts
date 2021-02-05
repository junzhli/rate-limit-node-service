import express from "express";
import loggerHandler from "./middlewares/loggerHandler";
import {rateLimiter} from "./controllers/rateLimiter";
import {errorHandler} from "./middlewares/errorHandlers";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "../swagger.json";

const app = express();

app.set("etag", "strong"); // use strong etag
app.use(loggerHandler);

app.use("/rate", rateLimiter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(errorHandler);

export default app;
