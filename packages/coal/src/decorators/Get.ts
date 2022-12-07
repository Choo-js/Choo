import "reflect-metadata";
import { MethodTypeMetadataKey, RoutePathMetadataKey } from "./constants.js";

export const Get = (path: string): MethodDecorator => {
    return (target: Object, key: string | symbol, __: PropertyDescriptor) => {
        const existing =
            Reflect.getMetadata(RoutePathMetadataKey, target, key) || {};
        existing.get = path;

        Reflect.defineMetadata(
            RoutePathMetadataKey,
            existing,
            Reflect.getPrototypeOf(target)!,
            key
        );
        Reflect.defineMetadata(
            MethodTypeMetadataKey,
            "route",
            Reflect.getPrototypeOf(target)!,
            key
        );
    };
};
