import type { FastifyInstance } from "fastify";
import { Logger } from "@choo-js/logger";

export const registerLoggerMiddleware = (fastify: FastifyInstance) => {
    fastify.addHook("onResponse", (req, res) => {
        Logger.info(
            `${req.method} ${req.url} ${res.statusCode} (${res.elapsedTime.toFixed(
                2
            )}s)`
        );
    });
};
