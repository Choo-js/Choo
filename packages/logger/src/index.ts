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

    private static log(base: string, message: string) {
        console.log(`${base} ${message}`);
    }

    public static info(message: string) {
        this.log(this.PREFIXES.info, message);
    }

    public static warn(message: string) {
        this.log(this.PREFIXES.warn, message);
    }

    public static error(message: string) {
        this.log(this.PREFIXES.error, message);
    }
}
