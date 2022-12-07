import { FastifyReply, FastifyRequest } from "fastify";
import {
    MethodTypeMetadataKey,
    ReplyParamIndexMetadataKey,
    RequestParamIndexMetadataKey,
} from "../decorators/constants";
import { getAllMetadata } from "./index";

export const getAllMiddlewares = (obj: Object) => {
    const keys = Reflect.ownKeys(Reflect.getPrototypeOf(obj)!);
    const routes = [];

    for (const key of keys) {
        const metadata = getAllMetadata(obj, key);

        if (metadata[MethodTypeMetadataKey] == "middleware") routes.push(key);
    }

    return routes;
};

export const executeMiddleware = (
    obj: any,
    name: string | symbol,
    req: FastifyRequest,
    res: FastifyReply
) => {
    const meta = getAllMetadata(obj, name);
    const params = meta["design:paramtypes"].length || 0;

    if (params.length === 0) return obj[name]();

    const args = Array(params);
    const reqIndex = meta[RequestParamIndexMetadataKey] || -1;
    const resIndex = meta[ReplyParamIndexMetadataKey] || -1;

    if (reqIndex !== -1) args[reqIndex] = req;
    if (resIndex !== -1) args[resIndex] = res;

    return obj[name](...args);
};
