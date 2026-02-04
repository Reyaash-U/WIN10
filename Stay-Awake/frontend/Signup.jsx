import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup({ setAuth }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Pure Frontend Logic: Store users in localStorage
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        if (users.find(u => u.email === email)) {
            setError("User already exists with this email");
            return;
        }

        const newUser = { id: Date.now(), username, email, password, role };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        // Automatically log in
        localStorage.setItem("user", JSON.stringify(newUser));
        setAuth(newUser);
        navigate("/");
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>📝 Sign Up</h2>
                <p>Create your Stay Awake account (Local Mode)</p>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Role</label>
                        <div className="role-selector">
                            <button
                                type="button"
                                className={role === "student" ? "active" : ""}
                                onClick={() => setRole("student")}
                            >
                                👩‍🎓 Student
                            </button>
                            <button
                                type="button"
                                className={role === "teacher" ? "active" : ""}
                                onClick={() => setRole("teacher")}
                            >
                                👨‍🏫 Teacher
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="auth-btn">Create Account</button>
                </form>
                <p className="auth-footer">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}
