import "reflect-metadata";
import { fastify, FastifyInstance } from "fastify";
import sourceMap from "source-map-support";
import {
    getAllMetadata,
    executeRoute,
    getAllRoutes,
    executeMiddleware,
    getAllMiddlewares,
} from "./metadata/index.js";
import {
    MiddlewareTypeKey,
    RoutePathMetadataKey,
    MiddlewareEvent,
    ControllerImpl,
} from "./decorators/index.js";
import middie from "@fastify/middie";
import { Logger } from "@choo-js/logger/src";
import { registerLoggerMiddleware } from "./middleware/logger.js";

sourceMap.install();

export interface RouteMethodList {
    get?: string;
    post?: string;
    put?: string;
    patch?: string;
    delete?: string;
}

export type RouteMethod = "get" | "post" | "put" | "patch" | "delete";
export type RouteMethods = RouteMethod[];

export class CoalInstance {
    public http: FastifyInstance & PromiseLike<FastifyInstance>;

    public static async new() {
        const instance = new CoalInstance();
        
        await instance.setup();

        return instance;
    }

    private constructor() {
        this.http = fastify({ logger: false });
    }

    public async setup() {
        await this.http.register(middie);
        registerLoggerMiddleware(this.http);
    }

    public async start() {
        Logger.info("Server listening on port 4000!");

        return this.http.listen({ port: 4000 });
    }

    public register<T extends ControllerImpl>(controller: T) {
        const routes = getAllRoutes(controller);
        const middlewares = getAllMiddlewares(controller);

        for (const route of routes) {
            const meta = getAllMetadata(controller, route);
            const path: RouteMethodList = meta[RoutePathMetadataKey] || {};
            const methods: RouteMethods = Object.keys(path) as any;

            for (const method of methods) {
                Logger.info(
                    `Registering route: ${
                        path[method]
                    } (${method.toUpperCase()})`
                );

                this.http[method](path[method]!, (req, res) =>
                    executeRoute(controller, route, req, res)
                );
            }
        }

        for (const middleware of middlewares) {
            const meta = getAllMetadata(controller, middleware);
            const event: MiddlewareEvent = meta[MiddlewareTypeKey]!;

            Logger.info(`Registering middleware: ${middleware.toString()}`);

            this.http.addHook(event as any, (req, res) =>
                executeMiddleware(controller, middleware, req, res)
            );
        }
    }
}

export * from "./exports.js";
