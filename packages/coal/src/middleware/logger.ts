import { FastifyInstance } from "fastify";
import { Logger } from "@choo-js/logger/src";

export const registerLoggerMiddleware = (fastify: FastifyInstance) => {
    fastify.addHook("onResponse", (req, res) => {
        Logger.info(
            `${req.method} ${req.url} ${res.statusCode} (${res
                .getResponseTime()
                .toFixed(2)}s)`
        );
    });
};
