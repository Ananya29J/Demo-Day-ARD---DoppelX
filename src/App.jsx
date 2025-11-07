import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Scheduler from "./components/Scheduler";
import StudyWithMe from "./components/StudyWithMe";
import Doppelganger from "./components/Doppelganger";
import PrevActivity from "./components/PrevActivity";
import About from "./components/About";
import Contact from "./components/Contact";

// ----- Main App -----
export default function App() {
  const [page, setPage] = useState("Doppelganger");

  const renderPage = () => {
    switch (page) {
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
    <div className="flex h-screen bg-gray-950 text-white">
      <Sidebar onSelect={setPage} />
      <main className="flex-1 p-8 overflow-y-auto">{renderPage()}</main>
    </div>
  );
}
