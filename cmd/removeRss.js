import inquirer from "inquirer";
import chalk from "chalk";
import Feed from "../models/feeds.js";
import { showNavigationOptions } from "../utils/ui.js";

export async function removeRss(){
          const feeds = await Feed.find().select('-_id feed_url');
          if(feeds.length === 0) {
            console.log(chalk.bold.yellowBright(`No RSS Feed To delete`));
          } else {
              const feed_urls = feeds.map(feed => feed.feed_url);
            
            
              const { choice } = await inquirer.prompt([
                        {
                          type: 'list',
                          name: 'choice',
                          message: chalk.bold('Choose RSS Feed To Delete'),
                          choices: feed_urls
                        }
                      ]);
                      
              const result = await Feed.deleteOne({ feed_url: choice });
                      
              if (result.deletedCount > 0) {
                        console.log(chalk.green.bold('Feed Removed Successfully'));
              } else {
                        console.log(chalk.red.bold('No feed was deleted. Something went wrong.'));
              }
          }
          await showNavigationOptions();
}