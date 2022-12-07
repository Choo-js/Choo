import { Locomotive } from "../packages/core/src/index.js";
import { ticketing } from "../packages/ticketing/src/index.js";
import { ExampleController } from "./example.js";

const run = async () => {
    console.log("Starting app...");
    console.time("App started in");

    const instance = await Locomotive.new();

    await instance.addCar(ticketing, {
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        database: "choo_ticketing_dev",
    });

    instance.controller(new ExampleController());

    console.timeEnd("App started in");

    await instance.start();
};

run();
