export type MemberRouteId = "aokiba" | "xiaoqian";
export type CatRouteId = "sweet" | "cake";

/** Return only route IDs backed by a real profile instead of silently selecting a fallback. */
export function memberIdForRoute(rawId: string | undefined): MemberRouteId | null {
  if (rawId === "aokiba" || rawId === "xiaoqian") return rawId;
  return null;
}

export function catIdForRoute(rawId: string | undefined): CatRouteId | null {
  if (rawId === "sweet" || rawId === "cake") return rawId;
  return null;
}
