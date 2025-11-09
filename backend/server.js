// server.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// ------------------------------
// Middleware
// ------------------------------
// Enable CORS for frontend origins
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // include your frontend URL(s)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // allow cookies/auth headers
  })
);

app.use(express.json()); // parse JSON bodies

// ------------------------------
// Root route (optional)
app.get("/", (req, res) => {
  res.send("✅ Backend server is running! Visit /api/test to test API.");
});

// ------------------------------
// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ Backend is working successfully!" });
});

// ------------------------------
// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
