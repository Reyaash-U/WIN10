import { useEffect, useRef, useState } from "react";

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const [pulse, setPulse] = useState(100);
  const [prompt, setPrompt] = useState(null);
  const lastTimeRef = useRef(0);

  const updatePulse = (delta) => {
    setPulse((prev) => {
      const next = Math.max(0, Math.min(100, prev + delta));
      if (next < 40) setPrompt("MICRO");
      else if (next < 60) setPrompt("REFLECT");
      else setPrompt(null);
      return next;
    });
  };

  useEffect(() => {
    const video = videoRef.current;

    const onPause = () => updatePulse(-5);

    const onTimeUpdate = () => {
      if (video.currentTime < lastTimeRef.current - 1) {
        updatePulse(-6);
      }
      lastTimeRef.current = video.currentTime;
    };

    video.addEventListener("pause", onPause);
    video.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      video.removeEventListener("pause", onPause);
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  const handleMicroResponse = async (choice) => {
    updatePulse(10);

    await fetch("http://localhost:5000/micro-response", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        choice,
        timestamp: new Date()
      })
    });

    setPrompt(null);
  };
  const recoverPulseSafely = () => {
  setPulse((prev) => {
    // Recover, but not instantly to 100
    const recovered = Math.min(prev + 10, 75);
    return recovered;
  });
  setPrompt(null);
};


  return (
    <>
      {/* 🎥 Video */}
      <video
        ref={videoRef}
        width="100%"
        style={{ borderRadius: "12px" }}
        controls
      >
        <source src="/sample.mp4" type="video/mp4" />
      </video>

      {/* 🧠 Pulse */}
      <div style={{ marginTop: "16px" }}>
        <strong>Attention Pulse</strong>
        <div className="pulse-bar">
          <div
            className="pulse-fill"
            style={{ width: `${pulse}%` }}
          />
        </div>
        <small>{pulse}%</small>
      </div>

      {/* 🟡 Reflection Prompt */}
      {prompt === "REFLECT" && (
        <div className="prompt">
          <p>Quick check — does this make sense?</p>
          <button onClick={() => recoverPulseSafely()}>👍 Yes</button>
          <button onClick={() => updatePulse(-5)}>🤔 Not yet</button>
        </div>
      )}

      {/* 🔴 Micro Question */}
      {prompt === "MICRO" && (
        <div className="prompt">
          <p><b>Which part felt unclear?</b></p>
          <button onClick={() => handleMicroResponse("Definition")}>
            Definition
          </button>
          <button onClick={() => handleMicroResponse("Example")}>
            Example
          </button>
          <button onClick={() => handleMicroResponse("Why it works")}>
            Why it works
          </button>
        </div>
      )}
    </>
  );
}
