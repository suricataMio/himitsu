import { describe, expect, it } from "vitest";
import { catIdForRoute, memberIdForRoute } from "@/lib/routeParams";

describe("route profile IDs", () => {
  it("rejects unknown member IDs instead of showing another profile", () => {
    expect(memberIdForRoute("aokiba")).toBe("aokiba");
    expect(memberIdForRoute("xiaoqian")).toBe("xiaoqian");
    expect(memberIdForRoute("unknown")).toBeNull();
    expect(memberIdForRoute(undefined)).toBeNull();
  });

  it("rejects unknown cat IDs instead of showing sweet", () => {
    expect(catIdForRoute("sweet")).toBe("sweet");
    expect(catIdForRoute("cake")).toBe("cake");
    expect(catIdForRoute("unknown")).toBeNull();
  });
});
