export * from "./metadata";
export * from "./decorators";
export * from "./middleware/logger";

export interface RouterEnv {
    isDev: boolean;
}

export interface RouterContext<T> {
    data: T;
    env: RouterEnv;
}

export const defaultRouterCtx: RouterContext<unknown> = {
    data: null,
    env: {
        isDev: process.env.NODE_ENV == "development",
    },
};
