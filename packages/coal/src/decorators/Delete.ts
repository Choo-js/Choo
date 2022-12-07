import "reflect-metadata";
import { MethodTypeMetadataKey, RoutePathMetadataKey } from "./constants";

export const Delete = (path: string): MethodDecorator => {
    return (target: Object, key: string | symbol) => {
        const existing =
            Reflect.getMetadata(RoutePathMetadataKey, target, key) || {};
        existing.delete = path;

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
