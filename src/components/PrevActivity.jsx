const activities = [
  { date: "Nov 1", hours: 3, score: 75 },
  { date: "Nov 2", hours: 4, score: 82 },
  { date: "Nov 3", hours: 2, score: 70 },
  { date: "Nov 4", hours: 5, score: 88 },
];

export default function PrevActivity() {
  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-purple-500 shadow-lg">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">Previous Activity</h2>
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
    </div>
  );
}
