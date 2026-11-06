// Run in UTC, Asia/Shanghai, America/New_York, Europe/Berlin and
// Australia/Lord_Howe to cover local dates and DST offsets.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getUpcomingEvents } from "./events";

describe("upcoming event list length", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 11, 31, 23, 59));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("fills all four UI cards after the current year's final event", () => {
    const events = getUpcomingEvents(4);

    expect(events).toHaveLength(4);
    expect(events.map(event => event.id)).toEqual([
      "anniversary-2027",
      "bday-xiaoqian-2027",
      "bday-aokiba-2027",
      "anniversary-2028",
    ]);
    expect(events[3].date).toEqual(new Date(2028, 0, 1));
  });

  it("fills the default five entries across the year boundary", () => {
    const events = getUpcomingEvents();

    expect(events).toHaveLength(5);
    expect(events[4].id).toBe("bday-xiaoqian-2028");
  });

  it("fills longer lists in date order without duplicate events", () => {
    const events = getUpcomingEvents(12);

    expect(events).toHaveLength(12);
    expect(new Set(events.map(event => event.id)).size).toBe(12);
    expect(events[0].id).toBe("anniversary-2027");
    expect(events[11].id).toBe("bday-aokiba-2030");
    expect(events.map(event => event.date.getTime())).toEqual(
      events.map(event => event.date.getTime()).sort((a, b) => a - b),
    );
  });

  it("retains today's event even late in the day", () => {
    vi.setSystemTime(new Date(2027, 0, 1, 23, 59));

    expect(getUpcomingEvents(1).map(event => event.id)).toEqual([
      "anniversary-2027",
    ]);
  });

  it("excludes yesterday's event", () => {
    vi.setSystemTime(new Date(2027, 0, 2, 0, 1));

    expect(getUpcomingEvents(1)[0].id).toBe("bday-xiaoqian-2027");
  });

  it.each([0, -1, 0.5, Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    "returns an empty list for unsupported count %s",
    count => {
      expect(getUpcomingEvents(count)).toEqual([]);
    },
  );

  it("preserves slice-style truncation for positive fractional counts", () => {
    expect(getUpcomingEvents(2.9)).toHaveLength(2);
  });
});
