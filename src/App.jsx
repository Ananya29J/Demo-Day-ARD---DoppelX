import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Scheduler from "./components/Scheduler";
import StudyWithMe from "./components/StudyWithMe";
import Doppelganger from "./components/Doppelganger";
import PrevActivity from "./components/PrevActivity";
import About from "./components/About";
import Contact from "./components/Contact";

export default function App() {
  const [activeComponent, setActiveComponent] = useState("Doppelganger");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Scheduler":
        return <Scheduler />;
      case "Study With Me":
        return <StudyWithMe />;
      case "Doppelganger":
        return <Doppelganger />;
      case "Previous Activity":
        return <PrevActivity />;
      case "About":
        return <About />;
      case "Contact Us":
        return <Contact />;
      default:
        return <Doppelganger />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar onSelect={setActiveComponent} />
      <div className="flex-1 p-8 overflow-auto">{renderComponent()}</div>
    </div>
  );
}
