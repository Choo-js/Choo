import "reflect-metadata";
import { ClassTypeMetadataKey } from "./constants";

export const Controller = (): ClassDecorator => {
    return (target: Function) => {
        Reflect.defineMetadata(ClassTypeMetadataKey, "controller", target);
    };
};
