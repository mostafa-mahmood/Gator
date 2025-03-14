import {XMLParser, XMLValidator} from 'fast-xml-parser';

// Takes xml string and returns json object
export function parseXml(xmlString) {
          const valid = XMLValidator.validate(xmlString);

          if (valid.err) {
            return null;
          }

          const parser = new XMLParser;
          const jsonObj = parser.parse(xmlString);
          return jsonObj;
}
