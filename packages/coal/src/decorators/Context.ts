import "reflect-metadata";
import { ContextParamIndexMetadataKey } from "./constants";

export const Context = (): ParameterDecorator => {
    return (
        target: Object,
        key: string | symbol | undefined,
        index: number
    ) => {
        Reflect.defineMetadata(
            ContextParamIndexMetadataKey,
            index,
            Reflect.getPrototypeOf(target)!,
            key!
        );
    };
};
