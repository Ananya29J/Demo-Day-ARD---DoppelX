import { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // success/error message
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus("Please fill all fields.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const token = localStorage.getItem("token"); // optional auth
      await axios.post(
        `${API_BASE}/contact`,
        { name, email, message },
        { headers: { Authorization: token ? `Bearer ${token}` : "" } }
      );

      setStatus("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
      setStatus("Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-purple-500 shadow-lg">
      <h2 className="text-4xl font-bold text-purple-300 mb-4 text-center">
        Contact Us
      </h2>

      <form
        className="max-w-lg mx-auto flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 bg-gray-800 text-white border border-purple-500 rounded-lg focus:outline-none"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 bg-gray-800 text-white border border-purple-500 rounded-lg focus:outline-none"
        />
        <textarea
          rows="4"
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-3 bg-gray-800 text-white border border-purple-500 rounded-lg focus:outline-none"
        />
        <button
          type="submit"
          className={`bg-purple-600 hover:bg-purple-700 py-3 rounded-lg text-white font-semibold ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
        {status && (
          <p
            className={`text-center mt-2 ${
              status.includes("success") ? "text-green-400" : "text-red-400"
            }`}
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
}
