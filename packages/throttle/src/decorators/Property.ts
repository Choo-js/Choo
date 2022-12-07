import "reflect-metadata";
import {
    PropertyDefaultMetadataKey,
    PropertyRequiredMetadataKey,
} from "./constants.js";

export const Property = <T>(
    required = false,
    defaultValue?: T
): PropertyDecorator => {
    return (target: Object, key: string | symbol) => {
        Reflect.defineMetadata(
            PropertyRequiredMetadataKey,
            required,
            target,
            key
        );

        if (defaultValue)
            Reflect.defineMetadata(
                PropertyDefaultMetadataKey,
                defaultValue,
                target,
                key
            );
    };
};
