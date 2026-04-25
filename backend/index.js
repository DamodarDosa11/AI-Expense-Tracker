require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

// ✅ 🔥 STRONG CORS FIX (handles everything)
app.use(cors());
app.options("*", cors()); // 🔥 handles preflight requests

app.use(express.json());

// 🔥 Routes
const expenseRoutes = require("./routes/expenseRoutes");
app.use("/", expenseRoutes);

// 🔥 Health check
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// 🔥 PORT
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});