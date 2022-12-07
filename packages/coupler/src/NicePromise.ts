export type NicePromiseCallback<T, E> = (
    resolve: (data: T) => void,
    reject: (err: E) => void
) => void;

export const nicePromise = <T, E = Error>(
    callback: NicePromiseCallback<T, E>
): Promise<T> => {
    return new Promise<T>(callback);
};
