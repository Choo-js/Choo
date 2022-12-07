import { program } from "commander";
import { InitCommand } from "./commands/init";

program.name("choo");
program.description("The Choo.js CLI tool.");

program.option("-d, --debug", "Output debug info.");

program.addCommand(new InitCommand());

program.parse(process.argv);

const options = program.opts();

if (options.debug) {
    console.log("[Debug] Debug enabled!");
    console.log("[Debug] Running with options:", options);
}
