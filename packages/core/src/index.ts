import { CoalInstance, ControllerImpl } from "@choo-js/coal/src/index.js";
import {
    FastifyPluginCallback,
    FastifyPluginOptions,
} from "fastify/fastify.js";

export type TrainCar<T> = (locomotive: Locomotive, options: T) => Promise<void>;

export class Locomotive {
    public raw: CoalInstance;

    private constructor(instance: CoalInstance) {
        this.raw = instance;
    }

    public static async new() {
        const coal = await CoalInstance.new();
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
