import { DataSource } from "typeorm";
import { User } from "./models/User.js";

export type DataSourceType =
    | "mysql"
    | "mariadb"
    | "postgres"
    | "cockroachdb"
    | "sqlite"
    | "better-sqlite3"
    | "mssql"
    | "mongodb";

export const buildDataSource = (
    type: DataSourceType,
    host: string,
    port: number,
    database: string,
    username: string,
    password?: string
) => {
    return new DataSource({
        type,
        host,
        port,
        username,
        password,
        database,
        synchronize: true,
        logging: false,
        entities: [User],
        migrations: [],
        subscribers: [],
    });
};
