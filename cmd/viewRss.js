import chalk from 'chalk';
import boxen from 'boxen';
import inquirer from 'inquirer';
import Feed from './../models/feeds.js';
import connectDB from './../utils/db.js';
import { initialChoices } from './main.js';
import { exit } from './exit.js';

export async function viewRss(){
          const documents = await Feed.find();
          for(const document of documents) {
                    console.log(boxen(chalk.bold(`${chalk.hex('#25b89b').bold('Url:')} ${document.feed_url} \n${chalk.hex('#25b89b').bold('Description:')} ${document.description} \n${chalk.hex('#25b89b').bold('Language:')} ${document.language}`),
                    {title: chalk.bold(`${document.title}`), titleAlignment: 'center', borderColor: '#25b89b', borderStyle: 'round'}))
          }

          const choice = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'choice',
                        message: chalk.bold('What would you like to do?'),
                        choices: ['Back', 'Exit']
                    }
          ]);

          switch(choice.choice) {
                    case 'Back':
                              clearScreen();
                              initialChoices();
                              break;
                    case 'Exit':
                              exit();
                              break;
          }
}

const clearScreen = () => {
          process.stdout.write('\x1Bc');
          console.log(boxen(chalk.hex('#25b89b').bold('Bringing the News to Your Terminal – One Feed at a Time!'), {title: chalk.bold('gator🐊'), titleAlignment: 'center', borderColor: '#25b89b', borderStyle: 'round'}));
};