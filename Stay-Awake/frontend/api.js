export async function sendEvent(type, impact) {
  await fetch("http://localhost:5000/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type,
      impact,
      timestamp: new Date()
    })
  });
}
