import { useState, useEffect } from "react";

export default function StudyWithMe() {
  const [seconds, setSeconds] = useState(25 * 60); // default 25 min
  const [isRunning, setIsRunning] = useState(false);
  const [infinity, setInfinity] = useState(false); // infinity mode toggle

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        if (!infinity && seconds <= 0) {
          setIsRunning(false);
        } else {
          setSeconds((s) => (infinity ? s + 1 : s - 1));
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, seconds, infinity]);

  const formatTime = (s) => {
    if (infinity) {
      const hrs = Math.floor(s / 3600);
      const mins = Math.floor((s % 3600) / 60);
      const secs = s % 60;
      return `${hrs}:${("0" + mins).slice(-2)}:${("0" + secs).slice(-2)}`;
    } else {
      return `${Math.floor(s / 60)}:${("0" + (s % 60)).slice(-2)}`;
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-purple-800 to-gray-900 rounded-3xl border border-purple-500 shadow-lg text-center">
      <h2 className="text-3xl font-bold text-purple-300 mb-4">Study With Me</h2>
      <h3 className="text-6xl font-bold mb-6">{formatTime(seconds)}</h3>
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setSeconds(infinity ? 0 : 25 * 60);
          }}
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white"
        >
          Reset
        </button>
      </div>
      <button
        onClick={() => {
          setInfinity(!infinity);
          setSeconds(0); // start from 0 in infinity mode
          setIsRunning(false);
        }}
        className="mt-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white"
      >
        {infinity ? "Disable Infinity Mode" : "Enable Infinity Mode"}
      </button>
    </div>
  );
}
