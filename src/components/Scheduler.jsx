import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Scheduler() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tasks");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.log("Failed to fetch tasks");
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    let timer;
    if (isRunning && currentTaskIndex !== null) {
      timer = setInterval(() => {
        setTasks((prev) => {
          const updated = [...prev];
          updated[currentTaskIndex].timeSpent += 1;
          return updated;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, currentTaskIndex]);

  const addTask = async () => {
    if (!taskName) return;
    const newTask = { name: taskName, startTime, endTime, timeSpent: 0, done: false };
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      if (!res.ok) throw new Error("Failed to add task");
      const savedTask = await res.json();
      setTasks((prev) => [...prev, savedTask]);
    } catch (err) {
      console.log("Failed to add task");
    }
    setTaskName("");
  };

  const toggleDone = async (index) => {
    const task = tasks[index];
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: !task.done }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      setTasks((prev) =>
        prev.map((t, i) => (i === index ? { ...t, done: !t.done } : t))
      );
    } catch (err) {
      console.log("Failed to toggle task");
    }
  };

  const startPauseTimer = (index) => {
    if (currentTaskIndex === index) {
      setIsRunning(!isRunning);
    } else {
      setCurrentTaskIndex(index);
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
    setCurrentTaskIndex(null);
  };

  const formatTime = (s) => {
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return `${hrs > 0 ? hrs + "h " : ""}${mins}m ${secs}s`;
  };

  const graphData = tasks.map((t) => ({ name: t.name, time: Math.floor(t.timeSpent / 60) }));
  const sortedTasks = tasks.sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-purple-500 shadow-lg">
      <h2 className="text-3xl font-bold text-purple-300 mb-4">Daily Scheduler</h2>
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task Name"
          className="flex-1 px-4 py-2 bg-gray-800 text-white border border-purple-500 rounded-lg"
        />
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="px-3 py-2 bg-gray-800 text-white border border-purple-500 rounded-lg"
        />
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="px-3 py-2 bg-gray-800 text-white border border-purple-500 rounded-lg"
        />
        <button onClick={addTask} className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700">
          Add
        </button>
      </div>

      <h2 className="text-3xl font-bold text-purple-300 mb-4">Task Manager</h2>
      <ul className="mb-6">
        {sortedTasks.map((t, i) => (
          <li key={i} className="flex justify-between items-center p-3 mb-2 rounded-lg bg-gray-700">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={t.done} onChange={() => toggleDone(i)} />
              <span className={`${t.done ? "line-through text-green-400" : "text-white"}`}>
                {t.name} ({t.startTime} - {t.endTime})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-300">{formatTime(t.timeSpent)}</span>
              <button
                onClick={() => startPauseTimer(i)}
                className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-lg text-white"
              >
                {currentTaskIndex === i && isRunning ? "Pause" : "Play"}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {currentTaskIndex !== null && (
        <button onClick={stopTimer} className="mb-6 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white">
          Stop Current Timer
        </button>
      )}

      <h2 className="text-3xl font-bold text-purple-300 mb-4">Daily Activity Graph</h2>
      {tasks.length > 0 ? (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={graphData}>
            <XAxis dataKey="name" tick={{ fill: "white" }} />
            <YAxis tick={{ fill: "white" }} />
            <Tooltip />
            <Bar dataKey="time" fill="#a855f7" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-300">No tasks yet.</p>
      )}
    </div>
  );
}
