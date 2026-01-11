export function findMostConfusingWindow(events) {
  const WINDOW = 5; // seconds
  let maxCount = 0;
  let bestWindow = null;

  for (let i = 0; i < events.length; i++) {
    const start = events[i].videoTime;
    const end = start + WINDOW;

    const count = events.filter(
      e => e.videoTime >= start && e.videoTime <= end
    ).length;

    if (count > maxCount) {
      maxCount = count;
      bestWindow = { from: start, to: end, events: count };
    }
  }

  return bestWindow;
}
