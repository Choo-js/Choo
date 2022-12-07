import "reflect-metadata";

import fs from "fs";
import path from "path";
import { ConfigSource } from "./decorators/Configuration.js";
import {
    ConfigSourceOrderMetadataKey,
    PropertyDefaultMetadataKey,
    PropertyRequiredMetadataKey,
} from "./decorators/constants.js";
import { ExampleConfig } from "./decorators/example.js";
import { getAllMetadata } from "./metadata/metadata.js";
import TOML from "@iarna/toml";
import yaml from "yaml";

export interface ConfigKeyInfo {
    required: boolean;
    defaultValue?: string | number;
    type: string;
}

export class ConfigurationObject<T extends Object> {
    private members: Record<string, ConfigKeyInfo>;
    private order: ConfigSource[];
    private values?: Record<string, string | number | undefined>;

    public constructor(raw: T) {
        this.parse(raw);
    }

    private parse(raw: T) {
        const order = getAllMetadata(raw.constructor)[
            ConfigSourceOrderMetadataKey
        ];

        if (!order)
            throw new TypeError(
                "The config object does not have the Configuration decorator!"
            );

        this.order = order;

        const keys = Reflect.ownKeys(raw);
        this.members = {};

        for (const key of keys) {
            const meta = getAllMetadata(raw, key);

            const required = meta[PropertyRequiredMetadataKey];
            const defaultValue = meta[PropertyDefaultMetadataKey];
            const type = meta["design:type"];

            if (required === undefined) continue;

            this.members[key.toString()] = {
                required,
                defaultValue,
                type: type.name,
            };
        }
    }

    public load() {
        for (const source of this.order) {
            if (source == "env") this.loadEnv();
            if (source == "file") this.loadFile();
        }

        const keys = Object.keys(this.members);

        for (const key of keys) {
            const required = this.members[key].required;
            const value = this.values![key];

            if (required && !value)
                throw new ReferenceError(
                    "No value present for variable: " + key + "!"
                );
        }
    }

    public loadFile() {
        let file;

        const tomlFile = path.join(process.cwd(), "config.toml");
        const yamlFile = path.join(process.cwd(), "config.yaml");
        const ymlFile = path.join(process.cwd(), "config.yml");
        const jsonFile = path.join(process.cwd(), "config.json");

        if (fs.existsSync(tomlFile)) file = tomlFile;
        else if (fs.existsSync(yamlFile)) file = yamlFile;
        else if (fs.existsSync(ymlFile)) file = ymlFile;
        else if (fs.existsSync(jsonFile)) file = jsonFile;
        else return;

        const contents = fs.readFileSync(file).toString();
        let parsed: Record<string, string | number>;

        if (file.endsWith(".toml"))
            parsed = TOML.parse(contents) as Record<string, string | number>;
        else if (file.endsWith(".yaml") || file.endsWith(".yml"))
            parsed = yaml.parse(contents);
        else parsed = JSON.parse(contents);

        const keys = Object.keys(parsed);

        const values = keys.map(
            ((key: string) => {
                const fromParsed = parsed[key];
                const fromDefault = this.members[key].defaultValue;
                const fromValues = this.values ? this.values[key] : undefined;

                const value = fromParsed || fromValues || fromDefault;

                return value;
            }).bind(this)
        );

        const complete: Record<string, string | number | undefined> = {};

        keys.forEach((k, i) => (complete[k] = values[i]));

        this.values = complete;
    }

    public loadEnv() {
        const keys = Object.keys(this.members).map((key) => ({
            envKey: "APP_" + key.toUpperCase(),
            key,
        }));

        const values = keys.map(
            ((key: { envKey: string; key: string }) => {
                const fromEnv = process.env[key.envKey];
                const fromDefault = this.members[key.key].defaultValue;
                const fromValues = this.values
                    ? this.values[key.key]
                    : undefined;

                const value = fromEnv || fromValues || fromDefault;

                return value;
            }).bind(this)
        );

        const complete: Record<string, string | number | undefined> = {};

        keys.forEach((k, i) => (complete[k.key] = values[i]));

        this.values = complete;
    }

    public get() {
        return this.values || {};
    }
}
