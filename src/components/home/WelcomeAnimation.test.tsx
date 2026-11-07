import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { WelcomeAnimation } from "./WelcomeAnimation";

describe("welcome animation accessibility", () => {
  it("marks both cat illustrations as decorative while keeping the greeting", () => {
    const markup = renderToStaticMarkup(<WelcomeAnimation />);
    const images = markup.match(/<img\b[^>]*>/g) ?? [];

    expect(images).toHaveLength(2);
    for (const image of images) {
      expect(image).toMatch(/\salt=""(?:\s|\/?>)/);
    }
    expect(markup).toContain("欢迎回家!");
  });
});
