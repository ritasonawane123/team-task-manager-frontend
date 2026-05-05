import React, { useEffect, useState } from "react";
import axios from "axios";
import Project from "./Project";
import Task from "./Task";

const API = "http://localhost:8080";

function Dashboard({ setPage }) {
  const [data, setData] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔄 Fetch dashboard data
  const fetchDashboard = () => {
    axios
      .get(`${API}/tasks/dashboard`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (!data) {
    return <h3 style={{ textAlign: "center" }}>Loading...</h3>;
  }

  return (
    <div style={container}>
      <h2>Dashboard</h2>

      <h4>
        Welcome, {user?.name} ({user?.role})
      </h4>

      {/* 📊 Cards */}
      <div style={grid}>
        <div style={card}>
          <h3>Total</h3>
          <p>{data.total}</p>
        </div>

        <div style={card}>
          <h3>Completed</h3>
          <p>{data.completed}</p>
        </div>

        <div style={card}>
          <h3>Pending</h3>
          <p>{data.pending}</p>
        </div>

        <div style={card}>
          <h3>Overdue</h3>
          <p>{data.overdue}</p>
        </div>
      </div>

      {/* 👑 ADMIN ONLY */}
      {user?.role === "ADMIN" && <Project />}

      {/* 👤 TASK SECTION */}
      <Task user={user} refreshDashboard={fetchDashboard} />

      {/* 🚪 Logout */}
      <button
        style={logoutBtn}
        onClick={() => {
          localStorage.removeItem("user");
          setPage("login");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;


// 🎨 Styles
const container = {
  padding: "20px",
  textAlign: "center",
  background: "#f4f6f8",
  minHeight: "100vh",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "20px",
  marginTop: "20px",
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const logoutBtn = {
  marginTop: "20px",
  padding: "10px 20px",
  background: "black",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};