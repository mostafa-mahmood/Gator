import chalk from 'chalk';
import { disconnectDB } from '../utils/db.js';

export function exit() {
          console.log(chalk.bold('Thanks for using gator!'));
          disconnectDB();
          process.exit(0);
}
