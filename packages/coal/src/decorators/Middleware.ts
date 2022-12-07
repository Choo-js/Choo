import "reflect-metadata";
import { MethodTypeMetadataKey, MiddlewareTypeKey } from "./constants.js";

export type MiddlewareEvent = "onRequest" | "onResponse";

export const Middleware = (event?: MiddlewareEvent): MethodDecorator => {
    return (target: Object, key: string | symbol, __: PropertyDescriptor) => {
        Reflect.defineMetadata(
            MethodTypeMetadataKey,
            "middleware",
            Reflect.getPrototypeOf(target)!,
            key
        );
        Reflect.defineMetadata(
            MiddlewareTypeKey,
            event || "onRequest",
            Reflect.getPrototypeOf(target)!,
            key
        );
    };
};
