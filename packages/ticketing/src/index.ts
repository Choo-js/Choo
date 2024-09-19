import sourceMap from "source-map-support";
sourceMap.install();

import "reflect-metadata";
import FastifyTypeORM from "./plugin";
import { Locomotive } from "@choo-js/core";
import { TicketingController } from "./routing";
import { DataSource } from "typeorm";
import type { DataSourceOptions } from "typeorm/browser";
import { User } from "./models";

export * from "./models";
export * from "./repositories";
export * from "./util";

export const ticketing = async (
    server: Locomotive,
    options: DataSourceOptions
) => {
    const entities = Array.isArray(options.entities)
        ? options.entities
        : Object.values(options.entities || {});

    const source = new DataSource({
        ...options,
        entities: [User, ...(entities || [])],
    });

    await server.plugin(FastifyTypeORM, { connection: source });
    server.controller(new TicketingController());
};
