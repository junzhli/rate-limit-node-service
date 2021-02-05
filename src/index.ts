import app from "./app";
import logger from "./libs/logger";

const log = logger("app");

app.listen(8080, () =>
    log.info("Rate limit service listening on port 8080!")
);