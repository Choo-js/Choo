import "reflect-metadata";
import { MethodTypeMetadataKey, MiddlewareTypeKey } from "./constants";

export type MiddlewareEvent = "onRequest" | "onResponse";

export const Middleware = (event?: MiddlewareEvent): MethodDecorator => {
    return (target: Object, key: string | symbol) => {
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
