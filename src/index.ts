import app from "./app";
import logger from "./libs/logger";

const log = logger("app");

const port = process.env.PORT || 8080;
app.listen(port, () =>
    log.info(`Rate limit service listening on port ${port}!`)
);