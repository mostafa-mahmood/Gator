import { validateUrl } from "../utils/url.js";
import { parseXml } from "../utils/xml.js";
import { XMLValidator } from "fast-xml-parser";

global.fetch = jest.fn();

jest.mock("../utils/xml.js", () => ({
  parseXml: jest.fn(),
}));

describe("validateUrl", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return false if fetch fails", async () => {
    fetch.mockRejectedValue(new Error("Network error"));
    await expect(validateUrl("https://invalid.url")).resolves.toBe(false);
  });

  it("should return false if XMLValidator fails", async () => {
    fetch.mockResolvedValue({ text: jest.fn().mockResolvedValue("<invalid>") });
    jest.spyOn(XMLValidator, "validate").mockReturnValue({ err: true });

    await expect(validateUrl("https://invalid.xml")).resolves.toBe(false);
  });

  it("should return false if parseXml returns null", async () => {
    fetch.mockResolvedValue({ text: jest.fn().mockResolvedValue("<validXml>") });
    jest.spyOn(XMLValidator, "validate").mockReturnValue(true);
    parseXml.mockReturnValue(null);

    await expect(validateUrl("https://valid.xml")).resolves.toBe(false);
  });

  it("should return false if XML doesn't contain <rss> or <feed>", async () => {
    fetch.mockResolvedValue({ text: jest.fn().mockResolvedValue("<validXml>") });
    jest.spyOn(XMLValidator, "validate").mockReturnValue(true);
    parseXml.mockReturnValue({ otherTag: {} });

    await expect(validateUrl("https://valid.xml")).resolves.toBe(false);
  });

  it("should return true for valid RSS XML", async () => {
    fetch.mockResolvedValue({ text: jest.fn().mockResolvedValue("<rss>") });
    jest.spyOn(XMLValidator, "validate").mockReturnValue(true);
    parseXml.mockReturnValue({ rss: { channel: {} } });

    await expect(validateUrl("https://valid.rss")).resolves.toBe(true);
  });

  it("should return true for valid Atom XML", async () => {
    fetch.mockResolvedValue({ text: jest.fn().mockResolvedValue("<feed>") });
    jest.spyOn(XMLValidator, "validate").mockReturnValue(true);
    parseXml.mockReturnValue({ feed: { entry: {} } });

    await expect(validateUrl("https://valid.atom")).resolves.toBe(true);
  });
});
