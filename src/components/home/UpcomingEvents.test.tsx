// Run this suite in TZ=UTC, TZ=Asia/Shanghai, TZ=America/New_York,
// TZ=Europe/Berlin and TZ=Australia/Lord_Howe to cover DST transitions.
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { getUpcomingEvents } from "@/lib/events";

vi.mock("@/lib/events", () => ({
  getUpcomingEvents: vi.fn(),
}));

describe("upcoming event calendar-day countdowns", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it.each([
    ["today", "2026-10-01T18:30:00", "2026-10-01T00:00:00", 0],
    ["tomorrow", "2026-10-01T23:59:00", "2026-10-02T00:00:00", 1],
    ["spring DST", "2026-03-07T12:00:00", "2026-03-09T00:00:00", 2],
    ["US autumn DST", "2026-10-31T12:00:00", "2026-11-02T00:00:00", 2],
    ["European autumn DST", "2026-10-24T12:00:00", "2026-10-26T00:00:00", 2],
    ["half-hour autumn DST", "2026-04-04T12:00:00", "2026-04-06T00:00:00", 2],
    ["anniversary across autumn DST", "2026-10-01T12:00:00", "2027-01-01T00:00:00", 92],
    ["leap day", "2028-02-28T12:00:00", "2028-03-01T00:00:00", 2],
    ["year boundary", "2026-12-31T23:59:00", "2027-01-01T00:00:00", 1],
  ])("%s", (_name, now, eventDate, days) => {
    // ISO date-times without a zone are intentional: events use local dates.
    vi.setSystemTime(new Date(now));
    vi.mocked(getUpcomingEvents).mockReturnValue([
      {
        id: "test-event",
        date: new Date(eventDate),
        title: "Upcoming event",
        type: "anniversary",
      },
    ]);

    const markup = renderToStaticMarkup(<UpcomingEvents />);
    const text = markup.replace(/<[^>]*>/g, "");

    expect(text.match(/-?\d+\s*天后/g)).toEqual([`${days} 天后`]);
    expect(getUpcomingEvents).toHaveBeenCalledWith(4);
  });

  it("keeps the empty state when no events are returned", () => {
    vi.mocked(getUpcomingEvents).mockReturnValue([]);

    const markup = renderToStaticMarkup(<UpcomingEvents />);

    expect(markup).toContain("暂时没有即将到来的事件");
    expect(markup).not.toContain("天后");
  });
});
