import Feed from './../models/feeds.js';
import Article from './../models/feeds_articles.js';
import chalk from 'chalk';
import {validateUrl} from './../utils/url.js';
import {getXML} from './client.js';
import {parseXml} from './../utils/xml.js';


export async function extractUrls() {
          const feeds = await Feed.find();

          if(feeds.length === 0) {
                    return null;
          }

          const feeds_urls_ids = feeds.map((feed) => {
                    return {
                        feed_url: feed.feed_url,
                        _id: feed._id
                    };
          });

          return feeds_urls_ids;
}

// before fetching any articles from rss feed 
// we have to make sure that the url is still a valid rss feed

export async function parseArticles() {
          const feeds_urls_ids = await extractUrls();
          if (!feeds_urls_ids || feeds_urls_ids.length === 0) {
              return [];
          }
          
          const results = [];
          for (const feed_url_id of feeds_urls_ids) {
              // validate url
              const valid = await validateUrl(feed_url_id.feed_url);
              if (!valid) continue;
      
              // fetch xml
              const xmlText = await getXML(feed_url_id.feed_url);
              if (!xmlText) continue;
              
              // convert xml to json object
              const jsonObj = parseXml(xmlText);
              if (!jsonObj || !jsonObj.rss || !jsonObj.rss.channel || !jsonObj.rss.channel.item) continue;
      
              // Make sure item is always an array (some feeds might have only one item)
              const items = Array.isArray(jsonObj.rss.channel.item) 
                  ? jsonObj.rss.channel.item 
                  : [jsonObj.rss.channel.item];
              
              for (const article of items) {
                  const resultObj = {
                      feed_id: feed_url_id._id,
                      title: article.title || 'Untitled',
                      description: article.description || '',
                      link: article.link || '',
                      category: Array.isArray(article.category) ? article.category.join(', ') : (article.category || null),
                      publish_date: article.pubDate ? new Date(article.pubDate) : null
                  };
                  results.push(resultObj);
              }
          }

          return results;
}

export async function saveArticles() {
          try {
                    await Article.deleteMany({});
                    const articlesArr = await parseArticles();
                    await Article.insertMany(articlesArr, { ordered: false });
          } catch (error) {
                    console.log(chalk.red.bold("Error saving articles:", error));
                    throw error;
          }
}