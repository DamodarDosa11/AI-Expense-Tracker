require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Production CORS (only your frontend domain)
app.use(cors());

// ✅ Body parser (CRITICAL — this was your issue)
app.use(express.json());

// ✅ Debug (REMOVE after testing)
app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  console.log("Body:", req.body);
  next();
});

// ✅ Routes
const expenseRoutes = require("./routes/expenseRoutes");
app.use("/expenses", expenseRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});