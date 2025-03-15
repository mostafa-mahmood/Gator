import boxen from "boxen";
import chalk from "chalk";
import Article from "./../models/feeds_articles.js";
import Feed from "./../models/feeds.js";
import inquirer from "inquirer";
import { showNavigationOptions } from "./../utils/ui.js";

export async function viewArticles() {
          while (true) {
          try {
          const articleCount = await Article.countDocuments();
          const { n } = await inquirer.prompt([
                    {
                              type: "input",
                              name: "n",
                              message: chalk.hex("#25b89b").bold(`Enter Number of articles to display (Number of Articles ${articleCount})`),
                              validate: (input) => {
                              const num = parseInt(input, 10);
                              if (isNaN(num) || num <= 0) {
                              return "Please enter a positive number";
                              }
                              return true;
                              },
                    },
          ]);

          const limit = parseInt(n, 10);

          const documents = await Article.find()
          .sort({ publish_date: -1 })
          .limit(limit);

          if (documents.length === 0) {
                    console.log(chalk.yellow.bold("No articles found to display"));
          } else {
                    for (const document of documents) {
                              const feed = await Feed.findOne({ _id: document.feed_id });
                              const feedName = feed ? feed.title : "Unknown Feed";

                              const content =
                              `${chalk.hex("#25b89b").bold("Source Feed:")} ${feedName}\n` +
                              `${chalk.hex("#25b89b").bold("Category:")} ${document.category || "None"}\n` +
                              `${chalk.hex("#25b89b").bold("Link:")} ${document.link}\n` +
                              `${chalk.hex("#25b89b").bold("Description:")} ${
                              document.description.slice(0, 500) + (document.description.length > 500 ? "..." : "")
                              }`;

                              console.log(
                              boxen(content, {
                              title: chalk.bold(`${document.title}`),
                              titleAlignment: "center",
                              borderColor: "blueBright",
                              borderStyle: "round",
                              padding: 1,
                              })
                              );
                    }
          }

          const choice = await showNavigationOptions();
          if (choice === "Back" || choice === "Exit") {
          break;
          }
           } catch (err) {
                    console.log(chalk.red.bold(`Error Viewing Articles: ${err.message}`));
                    const choice = await showNavigationOptions();
                    if (choice === "Back" || choice === "Exit") {
                              break;
                    }
          }
          }
}