import { RequestParamIndexMetadataKey } from "./constants.js";

export const Request = (): ParameterDecorator => {
    return (target: Object, key: string | symbol, index: number) => {
        Reflect.defineMetadata(
            RequestParamIndexMetadataKey,
            index,
            Reflect.getPrototypeOf(target)!,
            key
        );
    };
};
