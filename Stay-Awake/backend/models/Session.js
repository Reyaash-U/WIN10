import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  type: String,
  impact: Number,
  value: String,
  timestamp: Date,
  videoTime: Number 
});

const SessionSchema = new mongoose.Schema({
  pulse: { type: Number, default: 100 },
  events: [EventSchema]
});

export default mongoose.model("Session", SessionSchema);
