import {
    CoalInstance,
    ControllerImpl,
    defaultRouterCtx,
    type RouterContext,
} from "@choo-js/coal";
import type { FastifyPluginCallback, FastifyPluginOptions } from "fastify";

export type TrainCar<T, L = unknown> = (
    locomotive: Locomotive<L>,
    options: T
) => Promise<void>;

export class Locomotive<T = unknown> {
    public raw: CoalInstance<T>;

    private constructor(instance: CoalInstance<T>) {
        this.raw = instance;
    }

    public static async create<T = unknown>(
        ctx: RouterContext<T> = defaultRouterCtx as RouterContext<T>
    ) {
        const coal = await CoalInstance.create(ctx);
        const instance = new Locomotive(coal);

        return instance;
    }

    public plugin<O extends FastifyPluginOptions>(
        plugin: FastifyPluginCallback<O>,
        options: O
    ) {
        return this.raw.http.register(plugin, options);
    }

    public controller<T extends ControllerImpl>(controller: T) {
        this.raw.register(controller);
    }

    public addCar<T>(car: TrainCar<T>, options: T) {
        return car(this, options);
    }

    public start() {
        return this.raw.start();
    }
}
