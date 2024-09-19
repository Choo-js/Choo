import "reflect-metadata";
import {
    fastify,
    type FastifyInstance,
    type FastifyReply,
    type FastifyRequest,
} from "fastify";
import sourceMap from "source-map-support";
import {
    getAllMetadata,
    executeRoute,
    getAllRoutes,
    executeMiddleware,
    getAllMiddlewares,
} from "./metadata";
import {
    MiddlewareTypeKey,
    RoutePathMetadataKey,
    type MiddlewareEvent,
    ControllerImpl,
} from "./decorators";
import { Logger } from "@choo-js/logger";
import { registerLoggerMiddleware } from "./middleware/logger";
import middie from "@fastify/middie";
import { defaultRouterCtx, type RouterContext } from "./exports";

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

export type CoalFastify<T> = FastifyInstance &
    PromiseLike<FastifyInstance> & { context: RouterContext<T> };

export class CoalInstance<T = unknown> {
    public http: CoalFastify<T>;

    public static async create<T = unknown>(
        ctx: RouterContext<T> = defaultRouterCtx as RouterContext<T>
    ) {
        const instance = new CoalInstance(ctx);

        await instance.setup();

        return instance;
    }

    private constructor(
        ctx: RouterContext<T> = defaultRouterCtx as RouterContext<T>
    ) {
        this.http = fastify({ logger: false }).decorate(
            "context",
            ctx
        ) as CoalFastify<T>;
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
                    executeRoute(
                        controller,
                        route,
                        req,
                        res,
                        (req.server as CoalFastify<T>).context
                    )
                );
            }
        }

        for (const middleware of middlewares) {
            const meta = getAllMetadata(controller, middleware);
            const event: MiddlewareEvent = meta[MiddlewareTypeKey]!;

            Logger.info(`Registering middleware: ${middleware.toString()}`);

            this.http.addHook(
                event as any,
                (req: FastifyRequest, res: FastifyReply) =>
                    executeMiddleware(
                        controller,
                        middleware,
                        req,
                        res,
                        (req.server as CoalFastify<T>).context
                    )
            );
        }
    }
}

export * from "./exports";
