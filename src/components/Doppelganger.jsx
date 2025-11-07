import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", real: 3, twin: 5 },
  { day: "Tue", real: 4, twin: 6 },
  { day: "Wed", real: 2, twin: 5 },
  { day: "Thu", real: 5, twin: 6 },
  { day: "Fri", real: 4, twin: 7 },
  { day: "Sat", real: 3, twin: 5 },
  { day: "Sun", real: 4, twin: 6 },
];

export default function Doppelganger() {
  return (
    <div className="p-8 bg-gradient-to-br from-purple-800 via-gray-900 to-black rounded-3xl shadow-xl text-center border border-purple-600">
      <h2 className="text-4xl font-bold mb-4 text-purple-300">Your Digital Doppelgänger</h2>
      <p className="text-gray-300 text-lg mb-6">
        This AI Twin analyzes your study habits, sleep, and breaks — 
        then simulates different outcomes and techniques to boost results.
      </p>

      <div className="grid grid-cols-2 gap-6 mt-8">
        <div className="bg-gray-800 p-6 rounded-2xl border border-purple-500">
          <h3 className="text-xl font-semibold mb-3 text-purple-400">Simulation: Study Hours vs. Grades</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="real" stroke="#8b5cf6" strokeWidth={3} />
              <Line type="monotone" dataKey="twin" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl border border-purple-500 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-3 text-purple-400">Recommendation</h3>
          <p className="text-gray-300">
            Based on your data, increasing focused study sessions by <b>30 mins/day</b> 
            and sleeping before <b>11 PM</b> could raise predicted scores by <b>+12%</b>.
          </p>
        </div>
      </div>
    </div>
  );
}
