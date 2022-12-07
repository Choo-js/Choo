import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { DataSource, DataSourceOptions } from "typeorm";

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
            fastify.decorate("orm", {});
        }

        if (fastify.orm[namespace]) {
            throw new Error(
                `This namespace has already been declared: ${namespace}`
            );
        } else {
            fastify.orm[namespace] = connection;
            await fastify.orm[namespace].initialize();
            fastify.addHook("onClose", async (fastifyInstance, done) => {
                await fastifyInstance.orm[namespace].destroy();
                done();
            });

            return Promise.resolve();
        }
    }

    await connection.initialize();

    fastify.decorate("orm", connection);

    fastify.addHook("onClose", async (fastifyInstance, done) => {
        await fastifyInstance.orm.destroy();
        done();
    });

    return Promise.resolve();
};

export default fp(pluginAsync, {
    fastify: "4.x",
    name: "@fastify-typeorm",
});
