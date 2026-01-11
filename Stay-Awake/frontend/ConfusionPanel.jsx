import { useEffect, useState } from "react";

export default function ConfusionPanel() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/confusion")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data || !data.mostConfusingWindow) return null;

  const { from, to, events } = data.mostConfusingWindow;

  const start = new Date(from);
  const end = new Date(to);

  const formatTime = (d) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>🧠 Cognitive Insight</h3>

      <div style={styles.alert}>
        ⚠️ High confusion detected
      </div>

      <div style={styles.row}>
        <span>⏱️ Session Time</span>
        <strong>{formatTime(start)} – {formatTime(end)}</strong>
      </div>

      <div style={styles.row}>
        <span>🔥 Confusion Signals</span>
        <strong>{events}</strong>
      </div>

      <div style={styles.suggestion}>
        💡 <b>Suggestion:</b> Re-explain the example at this moment
      </div>
    </div>
  );
}

const styles = {
  card: {
    maxWidth: "500px",
    marginTop: "20px",
    padding: "20px",
    borderRadius: "12px",
    background: "#ffffff",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
  },
  title: {
    marginBottom: "12px"
  },
  alert: {
    background: "#ffe3e3",
    color: "#b00020",
    padding: "8px",
    borderRadius: "6px",
    marginBottom: "12px",
    fontWeight: "bold"
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px"
  },
  suggestion: {
    marginTop: "14px",
    background: "#f4f7ff",
    padding: "10px",
    borderRadius: "6px"
  }
};
