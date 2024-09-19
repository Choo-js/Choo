import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { DataSource, type DataSourceOptions } from "typeorm";

declare module "fastify" {
    export interface FastifyInstance {
        orm: DataSource & FastifyTypeormInstance.FastifyTypeormNamespace;
    }
}

declare namespace FastifyTypeormInstance {
    interface FastifyTypeormNamespace {
        [namespace: string]: DataSource;
    }
}

type DBConfigOptions = {
    connection?: DataSource;
    namespace?: string;
} & Partial<DataSourceOptions>;

const pluginAsync: FastifyPluginAsync<DBConfigOptions> = async (
    fastify,
    options
) => {
    const { namespace } = options;
    delete options.namespace;
    let connection: DataSource;

    if (options.connection) {
        connection = options.connection;
    } else {
        connection = new DataSource(options as DataSourceOptions);
    }

    if (namespace) {
        if (!fastify.orm) {
            fastify.decorate("orm", {} as any);
        }

        if (fastify.orm[namespace]) {
            throw new Error(
                `This namespace has already been declared: ${namespace}`
            );
        } else {
            fastify.orm[namespace] = connection;
            await fastify.orm[namespace].initialize();

            fastify.addHook("onClose", async (inst) => {
                await inst.orm[namespace].destroy();
            });

            return Promise.resolve();
        }
    }

    await connection.initialize();

    fastify.decorate("orm", connection as any);

    fastify.addHook("onClose", async (inst) => {
        await inst.orm.destroy();
    });

    return Promise.resolve();
};

export default fp(pluginAsync, {
    fastify: "5.x",
    name: "@fastify-typeorm",
});
