import "reflect-metadata";

export const getAllMetadata = (obj: Object, prop?: string | symbol) => {
    const keys = prop
        ? Reflect.getMetadataKeys(obj, prop)
        : Reflect.getMetadataKeys(obj);
    const values: Record<string, any> = {};

    for (const key of keys)
        values[key] = prop
            ? Reflect.getMetadata(key, obj, prop)
            : Reflect.getMetadata(key, obj);

    return values;
};
