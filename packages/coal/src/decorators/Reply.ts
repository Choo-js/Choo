import "reflect-metadata";
import { ReplyParamIndexMetadataKey } from "./constants";

export const Reply = (): ParameterDecorator => {
    return (
        target: Object,
        key: string | symbol | undefined,
        index: number
    ) => {
        Reflect.defineMetadata(
            ReplyParamIndexMetadataKey,
            index,
            Reflect.getPrototypeOf(target)!,
            key!
        );
    };
};
