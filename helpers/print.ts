import chalk from "chalk";

// =========print============
export enum OutputType {
    INFORMATION,
    SUCCESS,
    WARNING,
    ERROR,
}

//ham in ra hehe
export function print(message: any, type?: OutputType) {
    switch (type) {
        case OutputType.SUCCESS:
            console.log(chalk.green(message));
            break;
        case OutputType.INFORMATION:
            console.log(chalk.white(message));
            break;
        case OutputType.WARNING:
            console.log(chalk.yellow(message));
            break;
        case OutputType.ERROR:
            console.log(chalk.red(message));
            break;
        default:
            console.log(chalk.white(message));
            break;
    }
}

