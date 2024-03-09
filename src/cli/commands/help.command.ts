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
            ${chalk.cyan('--version')}:                                                  ${chalk.magentaBright('# выводит номер версии приложения')}
            ${chalk.cyan('--help')}:                                                     ${chalk.magentaBright('# выводит информацию о списке поддерживаемых команд')}
            ${chalk.cyan('--import')} <path> <user> <password> <host> <db_name> <salt>:  ${chalk.magentaBright('# импортирует данные из TSV-файла в БД')}
            ${chalk.cyan('--generate')} <n> <path> <url>:                                ${chalk.magentaBright('# генерирует заданное число предложений об аренде в файл формата TSV')}
    `);
  }
}
