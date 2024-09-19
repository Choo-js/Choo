import type { FastifyReply, FastifyRequest } from "fastify";
import {
    ContextParamIndexMetadataKey,
    MethodTypeMetadataKey,
    ReplyParamIndexMetadataKey,
    RequestParamIndexMetadataKey,
} from "../decorators/constants";
import { getAllMetadata } from "./index";
import type { RouterContext } from "src/exports";

export const getAllRoutes = (obj: Object) => {
    const keys = Reflect.ownKeys(Reflect.getPrototypeOf(obj)!);
    const routes = [];

    for (const key of keys) {
        const metadata = getAllMetadata(obj, key);

        if (metadata[MethodTypeMetadataKey] == "route") routes.push(key);
    }

    return routes;
};

export const executeRoute = <T = unknown>(
    obj: any,
    name: string | symbol,
    req: FastifyRequest,
    res: FastifyReply,
    ctx: RouterContext<T>,
) => {
    const meta = getAllMetadata(obj, name);
    const params = meta["design:paramtypes"].length || 0;

    if (params.length === 0) return obj[name]();

    const args = Array(params);
    const reqIndex = meta[RequestParamIndexMetadataKey] ?? -1;
    const resIndex = meta[ReplyParamIndexMetadataKey] ?? -1;
    const contextIndex = meta[ContextParamIndexMetadataKey] || -1;

    if (reqIndex !== -1) args[reqIndex] = req;
    if (resIndex !== -1) args[resIndex] = res;
    if (contextIndex !== -1) args[contextIndex] = ctx;

    return obj[name](...args);
};
