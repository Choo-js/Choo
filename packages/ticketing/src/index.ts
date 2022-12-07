import sourceMap from "source-map-support";
sourceMap.install();

import "reflect-metadata";
import FastifyTypeORM from "./plugin.js";
import { buildDataSource, DataSourceType } from "./dataSource.js";
import { Locomotive } from "@choo-js/core/src/index.js";
import { TicketingController } from "./routing.js";

export * from "./models/index.js";
export * from "./repositories/index.js";
export * from "./util/index.js";

export interface TicketingOptions {
    type: DataSourceType;
    host: string;
    port: number;
    username: string;
    password?: string;
    database: string;
}

export const ticketing = async (
    server: Locomotive,
    options: TicketingOptions
) => {
    const { type, host, port, database, username, password } = options;

    const source = buildDataSource(
        type,
        host,
        port,
        database,
        username,
        password
    );

    await server.plugin(FastifyTypeORM, { connection: source });
    server.controller(new TicketingController());
};
