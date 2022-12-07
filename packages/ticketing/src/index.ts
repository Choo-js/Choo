import sourceMap from "source-map-support";
sourceMap.install();

import "reflect-metadata";
import FastifyTypeORM from "./plugin";
import { buildDataSource, DataSourceType } from "./dataSource";
import { Locomotive } from "@choo-js/core";
import { TicketingController } from "./routing";

export * from "./models";
export * from "./repositories";
export * from "./util";

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
