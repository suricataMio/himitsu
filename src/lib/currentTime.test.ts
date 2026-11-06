import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { subscribeToCurrentTime } from "./currentTime";

describe("minute-precision clock subscription", () => {
  const cleanups: (() => void)[] = [];

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 11, 31, 23, 59, 59, 750));
    vi.stubGlobal(
      "window",
      Object.assign(new EventTarget(), {
        setTimeout: globalThis.setTimeout,
        clearTimeout: globalThis.clearTimeout,
      }),
    );
    vi.stubGlobal("document", new EventTarget());
  });

  afterEach(() => {
    cleanups.splice(0).forEach((cleanup) => cleanup());
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("publishes immediately, then on minute and local-date boundaries", () => {
    const listener = vi.fn();
    cleanups.push(subscribeToCurrentTime(listener));

    expect(listener).toHaveBeenLastCalledWith(new Date());
    vi.advanceTimersByTime(249);
    expect(listener).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(1);
    expect(listener).toHaveBeenLastCalledWith(new Date(2027, 0, 1));
    vi.advanceTimersByTime(60_000);
    expect(listener).toHaveBeenCalledTimes(3);
    expect(listener).toHaveBeenLastCalledWith(new Date(2027, 0, 1, 0, 1));
    expect(vi.getTimerCount()).toBe(1);
  });

  it("waits a full minute when subscribed exactly on a boundary", () => {
    vi.setSystemTime(new Date(2027, 0, 1));
    const listener = vi.fn();
    cleanups.push(subscribeToCurrentTime(listener));

    vi.advanceTimersByTime(59_999);
    expect(listener).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(1);
    expect(listener).toHaveBeenCalledTimes(2);
  });

  it.each(["focus", "pageshow", "visibilitychange"])(
    "refreshes and reschedules without duplicate timers on %s",
    (event) => {
      const listener = vi.fn();
      cleanups.push(subscribeToCurrentTime(listener));
      vi.setSystemTime(new Date(2027, 0, 2, 12, 34, 45, 500));

      const target = event === "visibilitychange" ? document : window;
      target.dispatchEvent(new Event(event));
      target.dispatchEvent(new Event(event));
      expect(listener).toHaveBeenLastCalledWith(new Date());
      expect(vi.getTimerCount()).toBe(1);

      vi.advanceTimersByTime(14_500);
      expect(listener).toHaveBeenLastCalledWith(new Date(2027, 0, 2, 12, 35));
      expect(vi.getTimerCount()).toBe(1);
    },
  );

  it("removes all timers and listeners on cleanup", () => {
    const listener = vi.fn();
    subscribeToCurrentTime(listener)();
    listener.mockClear();

    vi.advanceTimersByTime(120_000);
    window.dispatchEvent(new Event("focus"));
    window.dispatchEvent(new Event("pageshow"));
    document.dispatchEvent(new Event("visibilitychange"));

    expect(listener).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("supports React effect cleanup and resubscription", () => {
    const listener = vi.fn();
    subscribeToCurrentTime(listener)();
    cleanups.push(subscribeToCurrentTime(listener));
    listener.mockClear();

    vi.advanceTimersByTime(250);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(vi.getTimerCount()).toBe(1);
  });

  it("keeps independent subscribers active when another is removed", () => {
    const first = vi.fn();
    const second = vi.fn();
    const cleanupFirst = subscribeToCurrentTime(first);
    cleanups.push(subscribeToCurrentTime(second));
    cleanupFirst();
    first.mockClear();
    second.mockClear();

    vi.advanceTimersByTime(250);
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });
});
