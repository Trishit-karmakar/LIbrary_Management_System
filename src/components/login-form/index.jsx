import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/auth-context";

function LoginForm() {
  const { setToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email, password };

    try {
      const { data } = await axios.post(
        "https://library-api.local/api/auth/login",
        payload
      );
      setToken(data?.token);
      navigate("/admin");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials or server error.");
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
      <p style={{ textAlign: "center", marginTop: "18px" }}>
        Don't have an account? <Link to="/registration">Register</Link>
      </p>
    </div>
  );
}

const containerStyle = {
  background: "#fff",
  padding: "30px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.11)",
  width: "310px",
  margin: "50px auto",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  background: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default LoginForm;
