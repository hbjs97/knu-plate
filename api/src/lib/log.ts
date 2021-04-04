import chalk from 'chalk';
import { now } from './time';

export function infoLog(message: string | Error) {
  console.info(chalk.blue(`\n[${now()}] ${message}\n`));
}

export function errorLog(message: string | Error) {
  console.error(chalk.red(`\n[${now()}] ${message}\n`));
}

export function warmLog(message: string | Error) {
  console.warn(chalk.yellow(`\n[${now()}] ${message}\n`));
}
