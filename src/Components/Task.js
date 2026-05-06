import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "https://team-task-manager-backend-production-6601.up.railway.app";

function Task({ user, refreshDashboard }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status] = useState("TODO");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get(`${API}/tasks`);
    setTasks(res.data);
  };

  // 👑 ADMIN ONLY
  const createTask = async () => {
    await axios.post(`${API}/tasks?role=${user.role}`, {
      title,
      status,
      assignedTo,
      dueDate,
      project: { id: 1 }
    });

    alert("Task created");
    fetchTasks();
    refreshDashboard(); // 🔥 update cards
  };

  // 👤 MEMBER updates status
  const updateStatus = async (id, newStatus) => {
    await axios.put(`${API}/tasks/${id}`, {
      status: newStatus
    });

    fetchTasks();
    refreshDashboard(); // 🔥 update cards
  };

  return (
    <div style={box}>
      <h3>Tasks</h3>

      {/* 👑 ADMIN - Create Task */}
      {user.role === "ADMIN" && (
        <div>
          <input
            placeholder="Task title"
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            placeholder="Assign to"
            onChange={(e) => setAssignedTo(e.target.value)}
          />

          <input
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
          />

          {/* <select onChange={(e) => setStatus(e.target.value)}>
            <option value="TODO">TODO</option>
            <option value="DONE">DONE</option>
          </select> */}

          <button onClick={createTask}>Create Task</button>
        </div>
      )}

      {/* 👤 MEMBER ONLY - Task List */}
      {user.role === "MEMBER" && (
        <ul>
          {tasks.map((t) => (
            <li key={t.id}>
              <b>{t.title}</b> | {t.assignedTo} |

              <select
                value={t.status}
                onChange={(e) => updateStatus(t.id, e.target.value)}
              >
                <option value="TODO">TODO</option>
                <option value="DONE">DONE</option>
              </select>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Task;

const box = {
  marginTop: "20px",
  padding: "15px",
  background: "white",
  borderRadius: "10px",
};