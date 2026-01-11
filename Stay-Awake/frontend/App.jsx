import { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import ConfusionPanel from "./ConfusionPanel";

export default function App() {
  const [role, setRole] = useState("student");

  return (
    <div className="app">
      <div className="header">
        <h1>🎓 Stay Awake</h1>
        <p>Cognitive Pulse Engine for attention-aware learning</p>
      </div>

      <div className="toggle">
        <button
          className={role === "student" ? "active" : "inactive"}
          onClick={() => setRole("student")}
        >
          👩‍🎓 Student
        </button>

        <button
          className={role === "teacher" ? "active" : "inactive"}
          onClick={() => setRole("teacher")}
        >
          👨‍🏫 Teacher
        </button>
      </div>

      <div className="card">
        <h3>📘 Learning Session</h3>
        <VideoPlayer />
      </div>

      {role === "teacher" && (
        <div className="card">
          <h3>🧠 Teaching Insights</h3>
          <ConfusionPanel />
        </div>
      )}
    </div>
  );
}
