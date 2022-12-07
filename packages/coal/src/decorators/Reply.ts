import { ReplyParamIndexMetadataKey } from "./constants.js";

export const Reply = (): ParameterDecorator => {
    return (target: Object, key: string | symbol, index: number) => {
        Reflect.defineMetadata(
            ReplyParamIndexMetadataKey,
            index,
            Reflect.getPrototypeOf(target)!,
            key
        );
    };
};
