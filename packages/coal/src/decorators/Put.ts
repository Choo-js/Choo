import "reflect-metadata";
import { RoutePathMetadataKey, MethodTypeMetadataKey } from "./constants.js";

export const Put = (path: string): MethodDecorator => {
    return (target: Object, key: string | symbol, __: PropertyDescriptor) => {
        const existing =
            Reflect.getMetadata(RoutePathMetadataKey, target, key) || {};
        existing.put = path;

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
