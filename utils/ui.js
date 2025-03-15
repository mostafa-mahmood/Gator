import inquirer from 'inquirer';
import chalk from 'chalk';
import boxen from 'boxen';
import { initialChoices } from '../cmd/main.js';
import { exit } from '../cmd/exit.js';


/**
 * Clear the terminal screen and display the app header
 */
export function clearScreen() {

          process.stdout.write('\x1Bc');

          console.log(boxen(
          chalk.hex('#25b89b').bold('Bringing the News to Your Terminal – One Feed at a Time!'), 
                    {
                              title: chalk.bold('gator🐊'), 
                              titleAlignment: 'center', 
                              borderColor: '#25b89b', 
                              borderStyle: 'round'
                    }
          ));
          }

          /**
           * Display navigation options and handle the selected choice
           * @param {Array} additionalChoices - Optional additional choices to add before Back and Exit
           * @returns {Promise<string>} - The selected choice
           */

          export async function showNavigationOptions(additionalChoices = []) {
          const allChoices = [...additionalChoices, 'Back', 'Exit'];
          
          const { choice } = await inquirer.prompt([
                    {
                    type: 'list',
                    name: 'choice',
                    message: chalk.hex('#25b89b').bold("What would you like to do"),
                    choices: allChoices
                    }
          ]);
          
          if (choice === 'Back') {
                    clearScreen();
                    initialChoices();
          } else if (choice === 'Exit') {
                    exit();
          }
          
          return choice;
}