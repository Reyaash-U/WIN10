import express from "express";
import cors from "cors";
import "./db.js";
import Session from "./models/Session.js";

// 🔍 Find most confusing time window
function findMostConfusingWindow(events, windowSizeSeconds = 10) {
  const times = events
    .map(e => new Date(e.timestamp).getTime())
    .sort((a, b) => a - b);

  let start = 0;
  let maxCount = 0;
  let bestWindowStart = null;
  let bestWindowEnd = null;

  for (let end = 0; end < times.length; end++) {
    while (times[end] - times[start] > windowSizeSeconds * 1000) {
      start++;
    }

    const count = end - start + 1;

    if (count > maxCount) {
      maxCount = count;
      bestWindowStart = times[start];
      bestWindowEnd = times[end];
    }
  }

  return {
    maxEvents: maxCount,
    startTime: new Date(bestWindowStart),
    endTime: new Date(bestWindowEnd)
  };
}

const app = express();
app.use(cors());
app.use(express.json());

let session;

app.post("/event", async (req, res) => {
  let session = await Session.findOne().sort({ _id: -1 });

  // ✅ Auto-create session if deleted
  if (!session) {
    session = await Session.create({
      pulse: 100,
      events: []
    });
  }

  session.pulse += req.body.impact;
  session.pulse = Math.max(0, Math.min(100, session.pulse));
  session.events.push(req.body);

  await session.save();

  res.json({ pulse: session.pulse });
});
app.post("/micro-response", async (req, res) => {
  let session = await Session.findOne().sort({ _id: -1 });

  if (!session) {
    session = await Session.create({ pulse: 100, events: [] });
  }

  session.events.push({
    type: "MICRO_RESPONSE",
    value: req.body.choice,
    timestamp: req.body.timestamp
  });

  await session.save();

  res.json({ status: "saved" });
});


app.get("/confusion", async (req, res) => {
  const session = await Session.findOne().sort({ _id: -1 });

  if (!session || session.events.length === 0) {
    return res.json({ message: "No data yet" });
  }

  const result = findMostConfusingWindow(session.events, 10);

  res.json({
    mostConfusingWindow: {
      from: result.startTime,
      to: result.endTime,
      events: result.maxEvents
    }
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
