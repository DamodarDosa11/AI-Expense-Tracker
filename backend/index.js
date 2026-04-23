const express = require("express");
const app = express();
const cors = require("cors");


const expenseRoutes = require("./routes/expenseRoutes");

app.use(cors());
app.use(express.json());

// IMPORTANT LINE
app.use("/", expenseRoutes);

app.listen(4001, () => {
  console.log("Server is Running on port 4001");
});