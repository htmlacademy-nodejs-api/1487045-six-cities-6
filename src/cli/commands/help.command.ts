import chalk from 'chalk';
import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            main.cli.js --<${chalk.cyan('command')}> [${chalk.blue('--arguments')}]
        Команды:
            ${chalk.cyan('--version')}:                                                  ${chalk.magentaBright('# выводит номер версии')}
            ${chalk.cyan('--help')}:                                                     ${chalk.magentaBright('# печатает этот текст')}
            ${chalk.cyan('--import')} <path> <user> <password> <host> <db_name> <salt>:  ${chalk.magentaBright('# импортирует данные из TSV')}
            ${chalk.cyan('--generate')} <n> <path> <url>:                                ${chalk.magentaBright('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
