import {saveArticles} from './../controllers/feeds_articles.js';
import ora from "ora";
import chalk from 'chalk';
import { showNavigationOptions } from "./../utils/ui.js";

export async function fetchArticles() {
      const spinner = ora({
      text: `\x1b[38;2;37;184;155mFetching Articles\x1b[0m`, // #25b89b via RGB ANSI
      spinner: "dots",
      color: "cyan",
      }).start();
              
      try {
      await saveArticles();
              
      spinner.succeed(chalk.green.bold("Articles Fetched & Saved Successfully"));
      } catch (error) {
                  
      spinner.fail("Failed to process articles");
      console.error(error); 
      }

      await showNavigationOptions();
}