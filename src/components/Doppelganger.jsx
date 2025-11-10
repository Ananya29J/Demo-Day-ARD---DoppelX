import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Helper to calculate efficiency per hour
const calculateEfficiency = (studyHours, breakHours) => {
  const totalHours = studyHours + breakHours;
  if (totalHours === 0) return 0;
  return Math.round((studyHours / totalHours) * 100);
};

export default function Doppelganger() {
  const [userSchedules, setUserSchedules] = useState([]);
  const [testSchedules, setTestSchedules] = useState([]);

  const initialSchedule = {
    name: "",
    sessions: [{ sessionName: "", studyHours: "", breakHours: "" }],
  };

  const [newUserSchedule, setNewUserSchedule] = useState(initialSchedule);
  const [newTestSchedule, setNewTestSchedule] = useState(initialSchedule);

  const addSession = (type) => {
    const session = { sessionName: "", studyHours: "", breakHours: "" };
    if (type === "user") {
      setNewUserSchedule({ ...newUserSchedule, sessions: [...newUserSchedule.sessions, session] });
    } else {
      setNewTestSchedule({ ...newTestSchedule, sessions: [...newTestSchedule.sessions, session] });
    }
  };

  const handleSessionChange = (type, index, field, value) => {
    const update = (schedule) =>
      schedule.sessions.map((s, i) => (i === index ? { ...s, [field]: value } : s));
    if (type === "user") {
      setNewUserSchedule({ ...newUserSchedule, sessions: update(newUserSchedule) });
    } else {
      setNewTestSchedule({ ...newTestSchedule, sessions: update(newTestSchedule) });
    }
  };

  const addSchedule = (type) => {
    const scheduleToAdd =
      type === "user"
        ? { ...newUserSchedule }
        : { ...newTestSchedule };

    if (type === "user") {
      setUserSchedules([...userSchedules, scheduleToAdd]);
      setNewUserSchedule(initialSchedule);
    } else {
      setTestSchedules([...testSchedules, scheduleToAdd]);
      setNewTestSchedule(initialSchedule);
    }
  };

  // Generate hourly graph data
  const generateGraphData = (schedule) => {
    const data = [];
    schedule.sessions.forEach((s, idx) => {
      const study = Number(s.studyHours || 0);
      const brk = Number(s.breakHours || 0);
      for (let h = 1; h <= study; h++) {
        data.push({ hour: `${s.sessionName || `S${idx + 1}`} H${h}`, efficiency: calculateEfficiency(1, brk / study) });
      }
    });
    return data;
  };

  // Combined graph for all schedules
  const combinedGraphData = () => {
    const combined = [];
    [...userSchedules, ...testSchedules].forEach((sch) => {
      const graph = generateGraphData(sch);
      graph.forEach((d, idx) => {
        if (!combined[idx]) combined[idx] = { hour: d.hour };
        combined[idx][sch.name] = d.efficiency;
      });
    });
    return combined;
  };

  // Calculate total study and break hours for a schedule
  const getTotals = (schedule) => {
    const totalStudy = schedule.sessions.reduce((a, s) => a + Number(s.studyHours || 0), 0);
    const totalBreak = schedule.sessions.reduce((a, s) => a + Number(s.breakHours || 0), 0);
    const efficiency = calculateEfficiency(totalStudy, totalBreak);
    return { totalStudy, totalBreak, efficiency };
  };

  return (
    <div className="p-8 space-y-10">
      <h2 className="text-4xl font-bold text-purple-300 text-center">DoppelX Scheduler</h2>

      {/* User Schedule Input */}
      <div className="p-6 bg-gray-800 rounded-xl border border-purple-500">
        <h3 className="text-2xl font-semibold text-purple-400 mb-4">Add User Schedule</h3>
        <input
          type="text"
          placeholder="Schedule Name"
          className="mb-4 px-3 py-2 rounded-lg w-full text-black"
          value={newUserSchedule.name}
          onChange={(e) => setNewUserSchedule({ ...newUserSchedule, name: e.target.value })}
        />
        <div className="space-y-3">
          <div className="flex gap-3 font-semibold text-gray-200">
            <div className="flex-1">Session Name</div>
            <div className="flex-1">Study Hours</div>
            <div className="flex-1">Break Hours</div>
          </div>
          {newUserSchedule.sessions.map((s, idx) => (
            <div key={idx} className="flex gap-3">
              <input
                type="text"
                placeholder="Session Name"
                className="flex-1 px-2 py-1 rounded border"
                value={s.sessionName}
                onChange={(e) => handleSessionChange("user", idx, "sessionName", e.target.value)}
              />
              <input
                type="number"
                placeholder="Study Hours"
                className="flex-1 px-2 py-1 rounded border"
                value={s.studyHours}
                onChange={(e) => handleSessionChange("user", idx, "studyHours", e.target.value)}
              />
              <input
                type="number"
                placeholder="Break Hours"
                className="flex-1 px-2 py-1 rounded border"
                value={s.breakHours}
                onChange={(e) => handleSessionChange("user", idx, "breakHours", e.target.value)}
              />
            </div>
          ))}
          <button className="mt-2 bg-purple-600 px-4 py-2 rounded-lg text-white" onClick={() => addSession("user")}>
            + Add Session
          </button>
        </div>
        <button className="mt-4 bg-green-600 px-4 py-2 rounded-lg text-white" onClick={() => addSchedule("user")}>
          Save User Schedule
        </button>
      </div>

      {/* Test Schedule Input */}
      <div className="p-6 bg-gray-800 rounded-xl border border-purple-500">
        <h3 className="text-2xl font-semibold text-purple-400 mb-4">Add Test Schedule</h3>
        <input
          type="text"
          placeholder="Schedule Name"
          className="mb-4 px-3 py-2 rounded-lg w-full text-black"
          value={newTestSchedule.name}
          onChange={(e) => setNewTestSchedule({ ...newTestSchedule, name: e.target.value })}
        />
        <div className="space-y-3">
          <div className="flex gap-3 font-semibold text-gray-200">
            <div className="flex-1">Session Name</div>
            <div className="flex-1">Study Hours</div>
            <div className="flex-1">Break Hours</div>
          </div>
          {newTestSchedule.sessions.map((s, idx) => (
            <div key={idx} className="flex gap-3">
              <input
                type="text"
                placeholder="Session Name"
                className="flex-1 px-2 py-1 rounded border"
                value={s.sessionName}
                onChange={(e) => handleSessionChange("test", idx, "sessionName", e.target.value)}
              />
              <input
                type="number"
                placeholder="Study Hours"
                className="flex-1 px-2 py-1 rounded border"
                value={s.studyHours}
                onChange={(e) => handleSessionChange("test", idx, "studyHours", e.target.value)}
              />
              <input
                type="number"
                placeholder="Break Hours"
                className="flex-1 px-2 py-1 rounded border"
                value={s.breakHours}
                onChange={(e) => handleSessionChange("test", idx, "breakHours", e.target.value)}
              />
            </div>
          ))}
          <button className="mt-2 bg-purple-600 px-4 py-2 rounded-lg text-white" onClick={() => addSession("test")}>
            + Add Session
          </button>
        </div>
        <button className="mt-4 bg-green-600 px-4 py-2 rounded-lg text-white" onClick={() => addSchedule("test")}>
          Save Test Schedule
        </button>
      </div>

      {/* Individual Schedule Graphs */}
      <div className="space-y-10">
        {[...userSchedules, ...testSchedules].map((sch, idx) => {
          const graphData = generateGraphData(sch);
          const totals = getTotals(sch);
          return (
            <div key={idx} className="p-6 bg-gray-900 rounded-xl border border-purple-500 shadow-lg">
              <h3 className="text-2xl font-semibold text-purple-400 mb-2">{sch.name}</h3>
              <p className="text-gray-300 mb-2">
                Total Study: {totals.totalStudy}h, Total Break: {totals.totalBreak}h, Efficiency: {totals.efficiency}%
              </p>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={graphData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                  <XAxis dataKey="hour" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          );
        })}
      </div>

      {/* Combined Comparison Graph */}
      {userSchedules.length + testSchedules.length > 1 && (
        <div className="p-6 bg-gray-900 rounded-xl border border-purple-500 shadow-lg">
          <h3 className="text-2xl font-semibold text-purple-400 mb-2">Combined Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={combinedGraphData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
              <XAxis dataKey="hour" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Legend />
              {[...userSchedules, ...testSchedules].map((sch) => (
                <Line
                  key={sch.name}
                  type="monotone"
                  dataKey={sch.name}
                  stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                  strokeWidth={3}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
