import chalk from 'chalk';
import boxen from 'boxen';
import Feed from './../models/feeds.js';
import { showNavigationOptions } from '../utils/ui.js';

export async function viewRss(){

        const documents = await Feed.find();

        for(const document of documents) {
            console.log(boxen(
                chalk.bold(
                    `${chalk.hex('#25b89b').bold('Url:')} ${document.feed_url} \n` +
                    `${chalk.hex('#25b89b').bold('Description:')} ${document.description} \n` +
                    `${chalk.hex('#25b89b').bold('Language:')} ${document.language}`
                ),
                { title: chalk.bold(`${document.title}`), titleAlignment: 'center', borderColor: '#25b89b', borderStyle: 'round' }
            ));
        }

        await showNavigationOptions();
}