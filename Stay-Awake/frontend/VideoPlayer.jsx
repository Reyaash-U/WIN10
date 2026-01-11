import { useEffect, useRef, useState } from "react";

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const [pulse, setPulse] = useState(100);
  const [prompt, setPrompt] = useState(null);
  const lastTimeRef = useRef(0);

  // 🔹 NEW: Send interaction to backend with videoTime
  const sendEvent = async (type, impact) => {
    if (!videoRef.current) return;

    await fetch("http://localhost:5000/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        impact,
        videoTime: videoRef.current.currentTime // ✅ KEY FIX
      })
    });
  };

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
    if (!video) return;

    const onPause = () => {
      updatePulse(-5);
      sendEvent("PAUSE", -5); // ✅ SEND WITH VIDEO TIME
    };

    const onTimeUpdate = () => {
      // Detect rewind
      if (video.currentTime < lastTimeRef.current - 1) {
        updatePulse(-6);
        sendEvent("REWIND", -6); // ✅ SEND WITH VIDEO TIME
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
        videoTime: videoRef.current.currentTime // ✅ OPTIONAL BUT GOOD
      })
    });

    setPrompt(null);
  };

  const recoverPulseSafely = () => {
    setPulse((prev) => Math.min(prev + 10, 75));
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
          <button onClick={recoverPulseSafely}>👍 Yes</button>
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
