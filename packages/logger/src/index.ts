import chalk from "chalk";

export class Logger {
    public static PREFIXES = {
        info: `${chalk.blueBright("[")}${chalk.blue("INFO")}${chalk.blueBright(
            "]"
        )}`,
        warn: `${chalk.yellowBright("[")}${chalk.yellow(
            "WARN"
        )}${chalk.yellowBright("]")}`,
        error: `${chalk.redBright("[")}${chalk.red("ERROR")}${chalk.redBright(
            "]"
        )}`,
    };

    public static info(message: string) {
        const base = Logger.PREFIXES.info;
        const output = `${base} ${message}`;

        console.log(output);
    }

    public static warn(message: string) {
        const base = Logger.PREFIXES.warn;
        const output = `${base} ${message}`;

        console.log(output);
    }

    public static error(message: string) {
        const base = Logger.PREFIXES.error;
        const output = `${base} ${message}`;

        console.log(output);
    }
}
