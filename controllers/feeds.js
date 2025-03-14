import Feed from './../models/feeds.js';
import {parseXml} from './../utils/xml.js'
import {getXML} from './client.js';

export async function parseXmlFeed(url) {

          const xmlText = await getXML(url);

          const jsonObj = parseXml(xmlText);

          const parsedJson = {
                    feed_url: url
          }

          if(jsonObj.rss.channel.title) {
                    parsedJson.title = jsonObj.rss.channel.title
          }

          if(jsonObj.rss.channel.description) {
                    parsedJson.description = jsonObj.rss.channel.description
          }

          if(jsonObj.rss.channel.language) {
                    parsedJson.language = jsonObj.rss.channel.language
          }

          if(jsonObj.rss.channel.article_count) {
                    parsedJson.article_count = jsonObj.rss.channel.article_count
          }

          return parsedJson;
}

export async function storeFeed(url) {
          try {
                    const existingFeed = await Feed.findOne({ feed_url: url });
                    if (existingFeed) {
                              throw new Error('This RSS feed already exists');
                    }
                    const parsedJson = await parseXmlFeed(url);
                    const document = new Feed(parsedJson);
                    await document.save();
                    console.log(`Feed Saved To DB: ${parsedJson.feed_url}`);
          } catch(err) {
                    console.log(`Error storing feed: ${err}`);
          }
}