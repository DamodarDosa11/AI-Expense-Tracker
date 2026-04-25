require("dotenv").config();

const express = require("express");
const app = express();

// ✅ GLOBAL HEADERS (handles ALL CORS + preflight)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // 🔥 HANDLE PREFLIGHT REQUESTS
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

// ✅ Routes
const expenseRoutes = require("./routes/expenseRoutes");
app.use("/", expenseRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ Port
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});