This is my youtube link👇
📺 YouTube: (https://youtu.be/hqSTozWP2JU)



# 🎓 Stay Awake  
### Cognitive Pulse Engine for Attention-Aware Learning

Stay Awake is an adaptive learning system that detects **when learner understanding slips during video-based learning** and intervenes gently, in real time.

Unlike traditional systems that ask questions after fixed time intervals or at the end of a topic, Stay Awake responds to **actual learner behavior**.

> **“We don’t ask questions because time passed.  
> We ask questions because understanding slipped.”**

---

## 🚨 Problem

In online learning environments:

- Learners lose focus silently
- Confusion occurs *mid-lesson*, not at the end
- Teachers receive questions too late
- Simple doubts overload instructors
- Analytics focus on completion, not comprehension

Traditional quizzes are:
- Interruptive
- One-size-fits-all
- Stress-inducing
- Poor at identifying *where* learning broke

---

## 💡 Solution: Cognitive Pulse Engine (CPE)

Stay Awake introduces a **Cognitive Pulse** — a real-time score (0–100) that models learner attention and clarity.

The system:
- Listens to **privacy-safe interaction signals**
- Detects **mental drift**
- Intervenes **only when needed**
- Separates **student support** from **teacher analytics**

No webcam.  
No microphone.  
No biometric tracking.

---

## 🔍 Interaction Signals (Privacy-Safe)

| Signal | Interpretation |
|------|----------------|
| Video pause | Confusion or hesitation |
| Video rewind | Concept not landing |
| Rapid pause + rewind | High confusion |
| Idle playback | Attention fatigue |

These signals already exist in any video player.

---

## 🧠 How It Works

### 1️⃣ Interaction Listener (Frontend)
Tracks learner behavior:
- `PAUSE`
- `REWIND`

Each interaction is timestamped and sent to the backend.

---

### 2️⃣ Cognitive Pulse Engine (Backend)

Pulse is computed as:

Pulse = Attention − Confusion − Fatigue

yaml
Copy code

Design principles:
- Gradual decay (no sudden punishment)
- Smoothed recovery (no gaming the system)
- Per-learner, per-session

---

### 3️⃣ Adaptive Interventions (Student View)

| Pulse Range | System Action |
|------------|---------------|
| 60–100 | No interruption |
| 40–60 | Reflection prompt |
| < 40 | Micro-question |

#### 🟡 Reflection Prompt
> “Quick check — does this make sense?”

- 👍 Yes → cautious recovery
- 🤔 Not yet → escalation

#### 🔴 Micro Question
> “Which part felt unclear?”

- Definition  
- Example  
- Why it works  

Responses are **not graded** and **not shown to students later**.

---

### 4️⃣ Teacher Insights (Hidden from Students)

Teachers see:
- Most confusing time window
- Density of pause/rewind events
- Aggregated micro-question responses

Example insight:
> “Between 03:19–03:26, most learners struggled.  
Example explanation may need revision.”

Analytics are **never visible to students**.

---

## 👩‍🎓 Student View vs 👨‍🏫 Teacher View

| Student | Teacher |
|-------|--------|
| Video + gentle prompts | Confusion analytics |
| No scores | No individual identities |
| No pressure | Actionable insights |

This ensures ethical, low-stress learning.

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- HTML5 Video
- Custom CSS (lightweight)

### Backend
- Node.js
- Express
- MongoDB (Mongoose)

### Data Stored
- Session pulse
- Interaction events
- Micro-question responses
- Timestamps (UTC)

---

## 📁 Project Structure

Stay-Awake/
├─ frontend/
│ ├─ src/
│ │ ├─ App.jsx
│ │ ├─ VideoPlayer.jsx
│ │ ├─ ConfusionPanel.jsx
│ │ ├─ styles.css
│ │ └─ main.jsx
│ └─ public/
│ └─ sample.mp4
│
├─ backend/
│ ├─ server.js
│ ├─ db.js
│ ├─ models/
│ │ └─ Session.js
│ └─ utils/
│ └─ confusionAnalyzer.js

---

## ▶️ How to Run Locally

### 1️⃣ Start MongoDB
Ensure MongoDB is running locally:

mongodb://127.0.0.1:27017


---
### 2️⃣ Start Backend

```bash
cd backend
npm install
node server.js
Backend runs on:
http://localhost:5000
```

### 3️⃣ Start Frontend

```bash
cd frontend
npm install
npm run dev
Open browser at:
http://localhost:5173
```
