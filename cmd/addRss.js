import inquirer from 'inquirer';
import chalk from 'chalk';
import boxen from 'boxen';
import { initialChoices } from './main.js';
import { storeFeed } from './../controllers/feeds.js';
import { validateUrl } from './../utils/url.js';
import { exit } from './exit.js';

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
                throw new Error('INVALID URL');
            }

            const valid = await validateUrl(answer.url);
            if (!valid) {
                throw new Error('INVALID RSS FEED');
            }

            await storeFeed(answer.url);
            console.log(chalk.green('Feed added successfully!'));

        } catch (err) {
            console.log(chalk.bold.red(err.message));
        }

        const choice = await inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: chalk.bold('What would you like to do?'),
                choices: ['Add Another Feed', 'Back', 'Exit']
            }
        ]);

        switch (choice.choice) {
          case 'Add Another Feed':
                    clearScreen();
                    continue;
          case 'Back':
                    clearScreen();
                    initialChoices();
                    return;
          case 'Exit':
                    exit();
                    return;
        }
    }
}

const clearScreen = () => {
    process.stdout.write('\x1Bc');
    console.log(boxen(chalk.hex('#25b89b').bold('Bringing the News to Your Terminal – One Feed at a Time!'), {title: chalk.bold('gator🐊'), titleAlignment: 'center', borderColor: '#25b89b', borderStyle: 'round'}));
};