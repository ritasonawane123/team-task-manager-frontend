import React, { useState } from "react";
import axios from "axios";

const API = "http://localhost:8080";

function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(`${API}/auth/login`, {
        email,
        password,
      });

      // 🔍 DEBUG (see this in console)
      console.log("LOGIN RESPONSE:", res.data);

      // 🔥 Clear old user (important)
      localStorage.clear();

      // 🔥 Store new logged-in user
      localStorage.setItem("user", JSON.stringify(res.data));

      // 🔥 Navigate to dashboard
      setPage("dashboard");

    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div style={container}>
      <h1 style={title}>Team Task Manager</h1>
      <div style={card}>
        <h2>Login</h2>

        <input
          style={input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={btn} onClick={login}>
          Login
        </button>

        <p>
          Don’t have an account?{" "}
          <span style={link} onClick={() => setPage("signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;


// 🎨 Styles
const title = {
  position: "absolute",
  top: "80px",
  fontSize: "28px",
  fontWeight: "bold",
  color: "#333"
};

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "#f4f6f8",
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "300px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
};

const input = {
  display: "block",
  width: "100%",
  marginBottom: "10px",
  padding: "8px",
};

const btn = {
  padding: "10px",
  width: "100%",
  cursor: "pointer",
};

const link = {
  color: "blue",
  cursor: "pointer",
};