import { useState } from "react";
import { Calendar, Brain, Clock, Folder, Info, Mail } from "lucide-react";

export default function Sidebar({ onSelect }) {
  const [active, setActive] = useState("Doppelganger");

  const menus = [
    { name: "Scheduler", icon: <Calendar size={22} /> },
    { name: "Study With Me", icon: <Clock size={22} /> },
    { name: "Doppelganger", icon: <Brain size={22} /> },
    { name: "Previous Activity", icon: <Folder size={22} /> },
    { name: "About", icon: <Info size={22} /> },
    { name: "Contact Us", icon: <Mail size={22} /> },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-10 text-purple-400 tracking-wide">
          Digital Doppelgänger
        </h1>
        <ul>
          {menus.map((item) => (
            <li
              key={item.name}
              className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg mb-3 transition-all duration-200 ${
                active === item.name
                  ? "bg-purple-600 text-white"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
              onClick={() => {
                setActive(item.name);
                onSelect(item.name); // tell App.jsx which component to render
              }}
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="text-sm text-gray-500 text-center">
        © 2025 Digital Doppelgänger
      </div>
    </div>
  );
}
