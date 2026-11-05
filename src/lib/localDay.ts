/** A stable snapshot that changes when the browser's local calendar day changes. */
export function getLocalDay(): string {
  return new Date().toDateString();
}

/** Poll for day changes and catch up when returning to a suspended or cached page. */
export function subscribeToLocalDay(onChange: () => void): () => void {
  const timer = window.setInterval(onChange, 60 * 1000);
  window.addEventListener("focus", onChange);
  window.addEventListener("pageshow", onChange);
  document.addEventListener("visibilitychange", onChange);

  return () => {
    window.clearInterval(timer);
    window.removeEventListener("focus", onChange);
    window.removeEventListener("pageshow", onChange);
    document.removeEventListener("visibilitychange", onChange);
  };
}
