require("dotenv").config();

const express = require("express");
const app = express();

// ✅ GLOBAL CORS + PREFLIGHT (FINAL)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

// ✅ Routes
const expenseRoutes = require("./routes/expenseRoutes");
app.use("/", expenseRoutes);

// ✅ Health
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Server on ${PORT}`));