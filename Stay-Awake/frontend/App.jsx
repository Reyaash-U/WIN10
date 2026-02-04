import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import ConfusionPanel from "./ConfusionPanel";
import Login from "./Login";
import Signup from "./Signup";

function Dashboard({ role, setRole, user, onLogout }) {
  return (
    <div className="app">
      <div className="header-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div className="user-info">
          <span>👋 Hi, <strong>{user?.username}</strong></span>
        </div>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>

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

export default function App() {
  const [role, setRole] = useState("student");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setRole(parsedUser.role);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  if (loading) return null;

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login setAuth={setUser} /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup setAuth={setUser} /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={user ? (
            <Dashboard
              role={role}
              setRole={setRole}
              user={user}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/login" />
          )}
        />
      </Routes>
    </Router>
  );
}
