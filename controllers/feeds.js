import chalk from "chalk";
import Feed from "./../models/feeds.js";
import { parseXml } from "./../utils/xml.js";
import { getXML } from "./client.js";

export async function parseXmlFeed(url) {
          const xmlText = await getXML(url);
          const jsonObj = parseXml(xmlText);
          const parsedJson = {
          feed_url: url
          };

          if (jsonObj.rss && jsonObj.rss.channel) {
          const channel = jsonObj.rss.channel;
                    if (channel.title) parsedJson.title = channel.title;
                    if (channel.description) parsedJson.description = channel.description;
                    if (channel.language) parsedJson.language = channel.language;
                    else if (channel.item) parsedJson.article_count = Array.isArray(channel.item) ? channel.item.length : 1;
          } else if (jsonObj.feed) {
          const feed = jsonObj.feed;
                    if (feed.title) parsedJson.title = feed.title;
                    if (feed.subtitle) parsedJson.description = feed.subtitle;
                    if (feed.language) parsedJson.language = feed.language;
          }

          return parsedJson;
}

export async function storeFeed(url) {
          try {
                    const existingFeed = await Feed.findOne({ feed_url: url });
                    if (existingFeed) {
                    throw new Error("This RSS feed already exists");
          }
          const parsedJson = await parseXmlFeed(url);
          const document = new Feed(parsedJson);

          await document.save();

          console.log(chalk.green.bold(`Feed Saved To DB: ${parsedJson.feed_url}`));
          } catch (err) {
                    console.log(chalk.red.bold(`${err}`));
          }
}