import { parseXml } from "../utils/xml.js";
import { XMLValidator, XMLParser } from "fast-xml-parser";

jest.mock("fast-xml-parser", () => ({
  XMLValidator: {
    validate: jest.fn(),
  },
  XMLParser: jest.fn().mockImplementation(() => ({
    parse: jest.fn(),
  })),
}));

describe("parseXml", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return null if XML is invalid", () => {
    XMLValidator.validate.mockReturnValue({ err: true });

    expect(parseXml("<invalid>")).toBeNull();
  });

  it("should parse valid XML", () => {
    XMLValidator.validate.mockReturnValue(true);
    const mockParse = jest.fn().mockReturnValue({ rss: {} });
    XMLParser.mockImplementation(() => ({ parse: mockParse }));

    expect(parseXml("<rss></rss>")).toEqual({ rss: {} });
  });
});
