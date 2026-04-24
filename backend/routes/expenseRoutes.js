const express = require("express");
const router = express.Router();

const {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} = require("../controllers/expenseController");

router.get("/expenses", getExpenses);
router.post("/expenses", addExpense);
router.delete("/expenses/:id", deleteExpense);

// 🔥 IMPORTANT: must include :id
router.put("/expenses/:id", updateExpense);

module.exports = router;