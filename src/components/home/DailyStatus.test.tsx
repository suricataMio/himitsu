// Run in UTC, Asia/Shanghai, America/New_York, Europe/Berlin and Australia/Lord_Howe.
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { DailyStatus } from "./DailyStatus";

describe("daily status schedule boundaries", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it.each([
    ["2026-11-02T08:19:59.750", "都在家里"],
    ["2026-11-02T08:20:00", "正在上班：晓倩"],
    ["2026-11-02T09:59:59.750", "正在上班：晓倩"],
    ["2026-11-02T10:00:00", "正在上班：晓倩、我"],
    ["2026-11-02T18:19:59.750", "正在上班：晓倩、我"],
    ["2026-11-02T18:20:00", "正在上班：我"],
    ["2026-11-02T21:29:59.750", "正在上班：我"],
    ["2026-11-02T21:30:00", "都在家里"],
    ["2026-11-06T23:59:59.750", "都在家里"],
    ["2026-11-07T00:00:00", "周末时光 · 都在家里"],
    ["2026-11-08T23:59:59.750", "周末时光 · 都在家里"],
    ["2026-11-09T00:00:00", "都在家里"],
  ])("shows the correct work status at %s", (date, expected) => {
    vi.setSystemTime(new Date(date));
    const markup = renderToStaticMarkup(<DailyStatus variant="work" />);
    const text = markup.replace(/<[^>]*>/g, "");

    expect(text).toContain(expected);
    expect(text).not.toContain("猫咪状态流转");
  });

  it.each([
    ["2026-11-02T07:59:59.750", "在沙发上睡觉"],
    ["2026-11-02T08:00:00", "在房间走动"],
    ["2026-11-02T11:59:59.750", "在房间走动"],
    ["2026-11-02T12:00:00", "在阳台晒太阳"],
    ["2026-11-02T17:59:59.750", "在阳台晒太阳"],
    ["2026-11-02T18:00:00", "自由活动中"],
    ["2026-11-02T22:59:59.750", "自由活动中"],
    ["2026-11-02T23:00:00", "在沙发上睡觉"],
  ])("shows the correct cat status at %s", (date, expected) => {
    vi.setSystemTime(new Date(date));
    const markup = renderToStaticMarkup(<DailyStatus variant="cat" />);
    const text = markup.replace(/<[^>]*>/g, "");

    expect(text).toContain(`现在：${expected}`);
    expect(text).not.toContain("当前上班状态");
  });
});
