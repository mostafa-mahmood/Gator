import inquirer from 'inquirer';
import chalk from 'chalk';
import { storeFeed } from './../controllers/feeds.js';
import { validateUrl } from './../utils/url.js';
import { showNavigationOptions, clearScreen } from '../utils/ui.js';


export async function addRss() {
    while (true) {
        try {
                const answer = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'url',
                        message: chalk.bold('Enter RSS feed URL')
                    }
                ]);

                if (answer.url.length === 0) {
                    throw new Error('Invalid URL');
                }

                const valid = await validateUrl(answer.url);
                if (!valid) {
                    throw new Error('Invalid XML or RSS Feed');
                }

                await storeFeed(answer.url);

                } catch (err) {
                    console.log(chalk.bold.red(err.message));
                }

                const choice = await showNavigationOptions(['Add Another Feed']);
            
                if (choice === 'Add Another Feed') {
                    clearScreen();
                    continue;
                }
                
                return;
    }
}