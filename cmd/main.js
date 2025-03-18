#!/usr/bin/env node

// Third Party Modules
import boxen from 'boxen';
import chalk from 'chalk';
import inquirer from 'inquirer';

// Local Modules
import {viewRss} from './viewRss.js';
import {addRss} from './addRss.js';
import {removeRss} from './removeRss.js';
import {viewArticles} from './viewArticles.js';
import {fetchArticles} from './fetchArticles.js';
import { handleCronJob } from "./cronJob.js";
import {exit} from './exit.js';
import {connectDB} from './../utils/db.js'

await connectDB();

console.log(boxen(chalk.hex('#25b89b').bold('Bringing the News to Your Terminal – One Feed at a Time!'), {title: chalk.bold('gator🐊'), titleAlignment: 'center', borderColor: '#25b89b', borderStyle: 'round'}));

export function initialChoices() {
          const CHOICES = {
                    VIEW_RSS: 'View RSS Feed Sources',
                    ADD_RSS: 'Add a New RSS Feed',
                    REMOVE_RSS: 'Remove an RSS Feed',
                    VIEW_ARTICLES: 'View All Articles',
                    FETCH_ARTICLES: 'Fetch Latest Articles',
                    CRON_JOB: 'Enable Cron Job', 
                    EXIT: 'Exit'
          };
                  
          inquirer
          .prompt([
                    {
                              type: 'list',
                              name: 'choice',
                              message: chalk.hex('#25b89b').bold("What would you like to do"),
                              choices: [
                                        { name: chalk.bold(CHOICES.VIEW_RSS), value: CHOICES.VIEW_RSS },
                                        { name: chalk.bold(CHOICES.ADD_RSS), value: CHOICES.ADD_RSS },
                                        { name: chalk.bold(CHOICES.REMOVE_RSS), value: CHOICES.REMOVE_RSS },
                                        { name: chalk.bold(CHOICES.VIEW_ARTICLES), value: CHOICES.VIEW_ARTICLES },
                                        { name: chalk.bold(CHOICES.FETCH_ARTICLES), value: CHOICES.FETCH_ARTICLES },
                                        { name: chalk.bold(CHOICES.CRON_JOB), value: CHOICES.CRON_JOB},
                                        { name: chalk.bold(CHOICES.EXIT), value: CHOICES.EXIT }
                              ],
                              default: CHOICES.VIEW_ARTICLES
                    }
          ])
          .then((answer) => {
                    
                    const { choice } = answer;
                              
                    switch (choice) {
                              case CHOICES.VIEW_RSS:
                              viewRss();
                              break;
                              case CHOICES.ADD_RSS:
                              addRss();
                              break;
                              case CHOICES.REMOVE_RSS:
                              removeRss();
                              break;
                              case CHOICES.VIEW_ARTICLES:
                              viewArticles();
                              break;
                              case CHOICES.FETCH_ARTICLES:
                              fetchArticles();
                              break;
                              case CHOICES.CRON_JOB:
                              handleCronJob();
                              break;
                              case CHOICES.EXIT:
                              exit();
                              default:
                              console.log(chalk.red('Invalid choice'));
                    }
          })
          .catch((err) => {
                    console.error(chalk.red(`Error occurred: ${err}`));
          })
}

initialChoices();