import cron from 'node-cron';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { showNavigationOptions } from "./../utils/ui.js";

import { saveArticles } from './../controllers/feeds_articles.js';

let cronJob = null;

export function isCronJobRunning() {
  return cronJob !== null;
}

export function enableCronJob() {
  if (isCronJobRunning()) {
    console.log(chalk.yellow('⚠️ Cron job is already running!'));
    return;
  }
  
  try {
    cronJob = cron.schedule('* * * * *', async () => {
      
      try {
        await saveArticles();
      } catch (error) {
        console.error(`[${new Date().toISOString()}] ❌ Error fetching articles:`, error);
      }
    });
    
    console.log(chalk.green('✅ Cron job enabled! Articles will be fetched every 60 minute.'));
  } catch (error) {
    console.error(chalk.red('❌ Error enabling cron job:'), error);
  }
}

export function disableCronJob() {
  if (!isCronJobRunning()) {
    console.log(chalk.yellow('⚠️ No cron job is currently running!'));
    return;
  }
  
  try {
    cronJob.stop();
    cronJob = null;
    console.log(chalk.yellow('🛑 Cron job disabled!'));
  } catch (error) {
    console.error(chalk.red('❌ Error disabling cron job:'), error);
  }
}

export function handleCronJob() {
  const isRunning = isCronJobRunning();
  
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'cronAction',
        message: chalk.hex('#25b89b').bold(
          isRunning 
            ? 'Cron job is currently running.' 
            : 'Cron job is currently disabled.'
        ),
        choices: [
          { name: chalk.bold('Enable Cron Job'), value: 'enable', disabled: isRunning },
          { name: chalk.bold('Disable Cron Job'), value: 'disable', disabled: !isRunning },
        ],
      },
    ])
    .then(async (answer) => {
      if (answer.cronAction === 'enable') {
        enableCronJob();
      } else {
        disableCronJob();
      }
      await showNavigationOptions();
    });
}