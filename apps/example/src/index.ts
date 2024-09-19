import { Locomotive } from "@choo-js/core";
import { ticketing } from "@choo-js/ticketing";
import { ExampleController } from "./example";
import * as path from "path";

const root: string = path.resolve(__dirname, "..");

const run = async () => {
    console.log("Starting app...");
    console.time("App started");

    const instance = await Locomotive.create();

    await instance.addCar(ticketing, {
        type: "sqlite",
        database: `${root}/db.sqlite`,
    });

    instance.controller(new ExampleController());

    console.timeEnd("App started");

    await instance.start();
};

run();
