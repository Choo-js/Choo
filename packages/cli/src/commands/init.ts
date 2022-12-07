import inquirer from "inquirer";
import * as tmp from "tmp";
import { simpleGit } from "simple-git";
import { Command } from "commander";
import * as path from "path";
import * as fs from "fs";
import { nicePromise } from "@choo-js/coupler/src/index.js";
import { Logger } from "@choo-js/logger/src";

export interface TmpDirResult {
    path: string;
    cleanup: () => void;
}

export class InitCommand extends Command {
    public constructor() {
        super("init");

        this.description("Initializes a new Choo.js project.");
        this.argument(
            "[folder]",
            "An optional folder to create the project in."
        );

        this.action(this._execute);
    }

    private async _execute(folder?: string) {
        const dir = folder || path.resolve(".");
        const isEmpty = !fs.existsSync(dir) || fs.readdirSync(dir).length === 0;
        let shouldContinue: boolean;

        if (!isEmpty)
            shouldContinue = (
                await inquirer.prompt({
                    message: "Directory not empty! Overwrite?",
                    type: "confirm",
                    name: "ok",
                })
            ).ok;
        else shouldContinue = true;

        if (!shouldContinue) process.exit(1);

        if (!fs.existsSync(dir)) fs.mkdirSync(dir);

        if (!isEmpty)
            fs.readdirSync(dir).forEach((d) =>
                fs.rmSync(path.join(dir, d), { recursive: true })
            );

        Logger.info("Creating a temporary directory...");

        const tmpDir = await nicePromise<TmpDirResult>((resolve) =>
            tmp.dir((_, path, cleanup) => resolve({ path, cleanup }))
        );

        Logger.info("Cloning template repository...");

        await simpleGit().clone(
            "https://github.com/Choo-js/Choo-Template",
            tmpDir.path
        );

        Logger.info("Copying files...");

        for (const file of fs.readdirSync(tmpDir.path))
            fs.renameSync(path.join(tmpDir.path, file), path.join(dir, file));

        Logger.info("Removing the temporary directory...");

        tmpDir.cleanup();

        Logger.info("Done!");
    }
}
