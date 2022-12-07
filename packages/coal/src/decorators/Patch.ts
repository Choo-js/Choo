import "reflect-metadata";
import { RoutePathMetadataKey, MethodTypeMetadataKey } from "./constants.js";

export const Patch = (path: string): MethodDecorator => {
    return (target: Object, key: string | symbol, __: PropertyDescriptor) => {
        const existing =
            Reflect.getMetadata(RoutePathMetadataKey, target, key) || {};
        existing.patch = path;

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
