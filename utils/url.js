import { parseXml } from "./../utils/xml.js"
import {XMLValidator} from 'fast-xml-parser';


// takes url string and returns a boolean
export async function validateUrl(url){

          try {
                    // fetch xml from url
                    const response = await fetch(url);
                    const xmlText = await response.text();

                    // validates that url provides xml
                    const xmlValid = XMLValidator.validate(xmlText);

                    if(xmlValid.err) { // the problem is here
                              return false;
                    };

                    // convert xml to json object
                    const jsonObj = parseXml(xmlText);
                    if(jsonObj === null) {
                              return false;
                    }

                    // Check if the XML has <rss> or <feed> as root
                    const isRSS = jsonObj.hasOwnProperty("rss");
                    const isAtom = jsonObj.hasOwnProperty("feed");

                    if (!isRSS && !isAtom) {
                              return false;
                    }

                    // Check for required inner elements
                    if (isRSS && !jsonObj.rss.hasOwnProperty("channel")) {
                              return false;
                    }
                    
                    if (isAtom && !jsonObj.feed.hasOwnProperty("entry")) {
                              return false;
                    }

                    return true;
          } catch(err) {
                    return false;
          }
}