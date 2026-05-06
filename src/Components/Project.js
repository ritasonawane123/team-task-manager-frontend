import React, { useState } from "react";
import axios from "axios";

const API = "https://team-task-manager-backend-production-6601.up.railway.app";

function Project() {
  const [name, setName] = useState("");
  const [teamMembers, setTeamMembers] = useState("");

  const createProject = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await axios.post(`${API}/projects?role=${user.role}`, {
        name,
        teamMembers
      });
      alert("Project created successfully");
      setName("");
      setTeamMembers("");
    } catch (err) {
      alert(err.response?.data || "Error creating project");
    }
  };

  return (
    <div style={box}>
      <h3>Create Project</h3>

      <input
        style={input}
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        style={input}
        placeholder="Team Members (comma separated emails)"
        value={teamMembers}
        onChange={(e) => setTeamMembers(e.target.value)}
      />

      <button style={btn} onClick={createProject}>
        Create Project
      </button>
    </div>
  );
}

export default Project;

// 🎨 Styles
const box = {
  marginTop: "20px",
  padding: "15px",
  background: "white",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

const input = {
  display: "block",
  width: "100%",
  marginBottom: "10px",
  padding: "8px"
};

const btn = {
  padding: "8px 12px",
  cursor: "pointer"
};