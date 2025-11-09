import { useState, useEffect } from "react";

export default function PrevActivity() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/activities");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setActivities(data);
      } catch (err) {
        console.log("Failed to fetch previous activities");
        setActivities([]);
      }
    };
    fetchActivities();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-purple-500 shadow-lg">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">Previous Activity</h2>
      {activities.length > 0 ? (
        <table className="w-full text-left border border-purple-600 rounded-lg overflow-hidden">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Study Hours</th>
              <th className="p-3">Score (%)</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((a) => (
              <tr key={a.date} className="border-t border-purple-500 hover:bg-gray-800">
                <td className="p-3">{a.date}</td>
                <td className="p-3">{a.hours}</td>
                <td className="p-3">{a.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-300">No activity data yet.</p>
      )}
    </div>
  );
}
