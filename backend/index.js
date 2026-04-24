require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

// 🔥 Middleware
app.use(cors());
app.use(express.json());

// 🔥 Routes
const expenseRoutes = require("./routes/expenseRoutes");
app.use("/", expenseRoutes);

// 🔥 Health check (important for deployment)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// 🔥 PORT (Render requires this)
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});