import express from "express";
import cors from "cors";
import "./db.js";
import { findMostConfusingWindow } from "./utils/confusionAnalyzer.js";
import Session from "./models/Session.js";


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
  try {
    const session = await Session.findOne().sort({ _id: -1 });

    if (!session || !session.events) {
      return res.json({ mostConfusingWindow: null });
    }

    const window = findMostConfusingWindow(session.events);

    res.json({ mostConfusingWindow: window });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to analyze confusion" });
  }
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
