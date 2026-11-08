import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CatWeightCard } from "./CatWeightCard";

describe("cat weight record dates", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 10, 7, 12));
  });

  afterEach(() => vi.useRealTimers());

  it.each([
    ["today", new Date(2026, 10, 7), "2026年11月7日"],
    ["yesterday", new Date(2026, 10, 6), "2026年11月6日"],
    ["a prior year", new Date(2025, 11, 31), "2025年12月31日"],
    ["leap day", new Date(2024, 1, 29), "2024年2月29日"],
  ])("uses the recorded date for %s without claiming a measurement today", (_label, date, formattedDate) => {
    const markup = renderToStaticMarkup(
      <CatWeightCard name="甜心" latestWeight={{ date, value: "7.8", unit: "斤" }} />,
    );
    const text = markup.replace(/<[^>]*>/g, "");

    expect(text).toContain(formattedDate);
    expect(text).not.toContain("今天");
    expect(text).toContain("甜心体重记录");
    expect(text).toContain("最近一次");
    expect(text).toContain("最近记录：甜心体重 7.8斤，状态稳定。");
  });

  it("keeps the supplied cat, weight and unit", () => {
    const markup = renderToStaticMarkup(
      <CatWeightCard
        name="蛋糕"
        latestWeight={{ date: new Date(2026, 9, 30), value: "3.6", unit: "kg" }}
      />,
    );
    const text = markup.replace(/<[^>]*>/g, "");

    expect(text).toContain("2026年10月30日");
    expect(text).toContain("蛋糕体重记录");
    expect(text).toContain("最近记录：蛋糕体重 3.6kg，状态稳定。");
    expect(text).not.toContain("今天");
  });
});
