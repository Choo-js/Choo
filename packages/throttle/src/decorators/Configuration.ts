import "reflect-metadata";
import { ConfigSourceOrderMetadataKey } from "./constants";

export type ConfigSource = "file" | "env";

export const Configuration = (order: ConfigSource[]): ClassDecorator => {
    return <T extends Function>(target: T) => {
        Reflect.defineMetadata(ConfigSourceOrderMetadataKey, order, target);
    };
};
