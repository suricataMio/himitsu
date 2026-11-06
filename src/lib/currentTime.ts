/** Keep a minute-precision clock aligned and catch up after the page resumes. */
export function subscribeToCurrentTime(onChange: (now: Date) => void): () => void {
  let timer: number | undefined;

  const update = () => {
    window.clearTimeout(timer);
    const now = new Date();
    onChange(now);
    const delay = 60_000 - (now.getSeconds() * 1000 + now.getMilliseconds());
    timer = window.setTimeout(update, delay);
  };

  update();
  window.addEventListener("focus", update);
  window.addEventListener("pageshow", update);
  document.addEventListener("visibilitychange", update);

  return () => {
    window.clearTimeout(timer);
    window.removeEventListener("focus", update);
    window.removeEventListener("pageshow", update);
    document.removeEventListener("visibilitychange", update);
  };
}
