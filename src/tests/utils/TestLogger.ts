import chalk from "chalk";

export default class TestLogging {
    prefix: string;

    constructor(prefix: string){
        this.prefix = prefix;
    }

    succes = (args: any) => console.log(chalk.green(`\u2705 ${this.prefix}: `, typeof args === 'string' ? chalk.greenBright(args) : args));
    error = (args: any) => console.log(chalk.red(`\u2715 ${this.prefix}: `, typeof args === 'string' ? chalk.redBright(args) : args));
    debug = (args: any) => console.log(chalk.yellow(`\u2715 ${this.prefix}: `, typeof args === 'string' ? chalk.yellowBright(args) : args));
}
