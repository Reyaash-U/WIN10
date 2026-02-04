import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setAuth }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Pure Frontend Logic: Check users in localStorage
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            setAuth(user);
            navigate("/");
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>🔑 Login</h2>
                <p>Welcome back to Stay Awake (Local Mode)</p>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
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
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-btn">Login</button>
                </form>
                <p className="auth-footer">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}
