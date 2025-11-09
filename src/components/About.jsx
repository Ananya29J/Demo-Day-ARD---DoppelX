import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export default function About() {
  const [userName, setUserName] = useState("");
  const [totalTasks, setTotalTasks] = useState(0);

  // Fetch user profile and stats
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        // Fetch user profile
        const userRes = await axios.get(`${API_BASE}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserName(userRes.data?.email || "Learner");

        // Fetch total tasks (optional)
        const tasksRes = await axios.get(`${API_BASE}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTotalTasks(tasksRes.data.length);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-purple-500 shadow-lg text-center">
      <h2 className="text-4xl font-bold text-purple-300 mb-4">
        About Digital Doppelgänger
      </h2>
      <p className="text-gray-300 text-lg leading-relaxed mb-4">
        The Digital Doppelgänger is your AI-powered study twin.  
        It analyzes your patterns, predicts outcomes, and helps you  
        optimize learning efficiency before real exams.  
        Designed for futuristic learners who want to master time and focus.
      </p>

      {/* Optional: Dynamic stats */}
      <p className="text-gray-400 mt-4">
        Welcome, <span className="text-purple-300 font-semibold">{userName}</span>!  
        You have <span className="text-purple-300 font-semibold">{totalTasks}</span> tasks in your schedule.
      </p>
    </div>
  );
}
