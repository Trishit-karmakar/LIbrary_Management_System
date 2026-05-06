import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && email && password) {
      const user = { name, email, password };
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/login");
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center" }}>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />
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
          Register
        </button>
      </form>
      <p style={{ textAlign: "center", marginTop: "18px" }}>
        Already have an account? <Link to="/login">Login</Link>
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

export default RegistrationForm;
