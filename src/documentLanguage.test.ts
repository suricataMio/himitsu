import { describe, expect, it } from "vitest";

import documentHtml from "../index.html?raw";

describe("document language", () => {
  it("identifies the Simplified Chinese interface for assistive technology", () => {
    const htmlTag = documentHtml.match(/<html\b[^>]*>/i)?.[0];

    expect(htmlTag).toMatch(/\slang=["']zh-CN["']/);
  });
});
