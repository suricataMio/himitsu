import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getLocalDay, subscribeToLocalDay } from "./localDay";

describe("local calendar day subscription", () => {
  const cleanups: (() => void)[] = [];

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 11, 31, 23, 59, 30));
    vi.stubGlobal(
      "window",
      Object.assign(new EventTarget(), {
        setInterval: globalThis.setInterval,
        clearInterval: globalThis.clearInterval,
      }),
    );
    vi.stubGlobal("document", new EventTarget());
  });

  afterEach(() => {
    cleanups.splice(0).forEach((cleanup) => cleanup());
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("keeps a stable snapshot within a local day", () => {
    const day = getLocalDay();
    vi.setSystemTime(new Date(2026, 11, 31, 23, 59, 59));
    expect(getLocalDay()).toBe(day);
  });

  it("notifies after a polling interval and exposes the new year", () => {
    const day = getLocalDay();
    const listener = vi.fn(() => getLocalDay());
    cleanups.push(subscribeToLocalDay(listener));

    vi.advanceTimersByTime(59_999);
    expect(listener).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveReturnedWith(new Date(2027, 0, 1).toDateString());
    expect(getLocalDay()).not.toBe(day);
  });

  it.each(["focus", "pageshow", "visibilitychange"])(
    "checks the snapshot immediately on %s after a suspended day",
    (event) => {
      const listener = vi.fn(() => getLocalDay());
      cleanups.push(subscribeToLocalDay(listener));
      vi.setSystemTime(new Date(2027, 0, 3, 12));

      const target = event === "visibilitychange" ? document : window;
      target.dispatchEvent(new Event(event));

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveReturnedWith(new Date(2027, 0, 3).toDateString());
    },
  );

  it("removes the timer and every listener on cleanup", () => {
    const listener = vi.fn();
    const cleanup = subscribeToLocalDay(listener);
    cleanup();

    vi.advanceTimersByTime(120_000);
    window.dispatchEvent(new Event("focus"));
    window.dispatchEvent(new Event("pageshow"));
    document.dispatchEvent(new Event("visibilitychange"));

    expect(listener).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("supports cleanup and resubscription without duplicate callbacks", () => {
    const listener = vi.fn();
    subscribeToLocalDay(listener)();
    cleanups.push(subscribeToLocalDay(listener));

    vi.advanceTimersByTime(60_000);
    window.dispatchEvent(new Event("pageshow"));

    expect(listener).toHaveBeenCalledTimes(2);
    expect(vi.getTimerCount()).toBe(1);
  });

  it("keeps independent subscribers active when another is removed", () => {
    const first = vi.fn();
    const second = vi.fn();
    const cleanupFirst = subscribeToLocalDay(first);
    cleanups.push(subscribeToLocalDay(second));
    cleanupFirst();

    vi.advanceTimersByTime(60_000);
    window.dispatchEvent(new Event("focus"));

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(2);
  });
});
