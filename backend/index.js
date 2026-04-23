const express = require("express");
const app = express();

const expenseRoutes = require("./routes/expenseRoutes");

app.use(express.json());

// IMPORTANT LINE
app.use("/", expenseRoutes);

app.listen(4001, () => {
  console.log("Server is Running on port 4001");
});