import express from "express";
import httpStatusCode from "http-status-codes";
import logger from "../libs/logger";

const log = logger("error-handler-middleware");

const errorHandler = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    // operational/technical errors
    log.log({ level: "error", message: "", error: err });
    const sentCode = httpStatusCode.INTERNAL_SERVER_ERROR;

    return res.status(sentCode).send();
};

export {
    errorHandler,
};
