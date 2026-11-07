import { renderToStaticMarkup } from "react-dom/server";
import { useReducedMotion } from "framer-motion";
import { afterEach, describe, expect, it, vi } from "vitest";

import { WelcomeAnimation } from "./WelcomeAnimation";

vi.mock("framer-motion", async (importOriginal) => ({
  ...await importOriginal<typeof import("framer-motion")>(),
  useReducedMotion: vi.fn(() => false),
}));

describe("welcome animation accessibility", () => {
  afterEach(() => vi.mocked(useReducedMotion).mockReturnValue(false));

  it("skips the blocking welcome overlay when reduced motion is preferred", () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);

    expect(renderToStaticMarkup(<WelcomeAnimation />)).toBe("");
  });

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
