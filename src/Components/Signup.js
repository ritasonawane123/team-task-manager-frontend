import React, { useState } from "react";
import axios from "axios";

const API = "http://localhost:8080";

function Signup({ setPage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔥 Default role = ADMIN (for testing clarity)
  const [role, setRole] = useState("ADMIN");

  const signup = async () => {
    try {
      console.log("Signup Data:", { name, email, password, role }); // 🔍 debug

      await axios.post(`${API}/auth/signup`, {
        name,
        email,
        password,
        role
      });

      alert("Signup successful");
      setPage("login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>Sign Up</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ✅ Controlled dropdown */}
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="ADMIN">ADMIN</option>
          <option value="MEMBER">MEMBER</option>
        </select>

        <button onClick={signup}>Signup</button>

        <p>
          Already have an account?{" "}
          <span style={link} onClick={() => setPage("login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;

// 🎨 Styles
const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "#f5f5f5"
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "300px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
};

const link = {
  color: "blue",
  cursor: "pointer"
};