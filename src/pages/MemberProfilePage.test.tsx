import { renderToStaticMarkup } from "react-dom/server";
import { useSyncExternalStore } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Router } from "wouter";

import { getLocalDay, subscribeToLocalDay } from "@/lib/localDay";
import MemberProfilePage from "./MemberProfilePage";

vi.mock("react", async (importOriginal) => {
  const original = await importOriginal<typeof import("react")>();
  return {
    ...original,
    useSyncExternalStore: vi.fn(original.useSyncExternalStore),
  };
});

function renderProfile(memberId: string) {
  return renderToStaticMarkup(
    <Router ssrPath={`/member/${memberId}`}>
      <MemberProfilePage params={{ memberId }} />
    </Router>,
  );
}

describe("member profile local-day refresh wiring", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 7, 16, 23, 59, 30));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it.each(["xiaoqian", "aokiba"])(
    "subscribes the %s profile to the shared local-day snapshot",
    (memberId) => {
      renderProfile(memberId);

      expect(useSyncExternalStore).toHaveBeenCalledWith(
        subscribeToLocalDay,
        getLocalDay,
        getLocalDay,
      );
    },
  );

  it("keeps hook order stable for an invalid member route", () => {
    renderProfile("unknown");

    expect(useSyncExternalStore).toHaveBeenCalledWith(
      subscribeToLocalDay,
      getLocalDay,
      getLocalDay,
    );
  });

  it("renders today's birthday and advances to next year on the following day", () => {
    vi.setSystemTime(new Date(2026, 7, 17, 0, 0, 30));
    const onBirthday = renderProfile("xiaoqian");
    expect(onBirthday).toContain("2026年8月17日");
    expect(onBirthday.replace(/<[^>]*>/g, "")).toContain("倒计时0 天");

    vi.setSystemTime(new Date(2026, 7, 18, 0, 0, 30));
    const afterBirthday = renderProfile("xiaoqian");
    expect(afterBirthday).toContain("2027年8月17日");
    expect(afterBirthday.replace(/<[^>]*>/g, "")).toContain("倒计时364 天");
  });
});
