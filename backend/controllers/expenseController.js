const pool = require("../db");

// GET all expenses
const getExpenses = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM expenses ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// ADD expense
const addExpense = async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    if (!title || !amount) {
      return res.status(400).json({ error: "Title and amount required" });
    }

    const result = await pool.query(
      "INSERT INTO expenses (title, amount, category) VALUES ($1, $2, $3) RETURNING *",
      [title, amount, category || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE expense
const deleteExpense = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const result = await pool.query(
      "DELETE FROM expenses WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json({
      message: "Deleted",
      deleted: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// 🔥 UPDATE expense (FULL FIX WITH CATEGORY)
const updateExpense = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // 🔥 IMPORTANT: include category
    const { title, amount, category } = req.body;

    console.log("UPDATE BODY:", req.body); // debug

    const result = await pool.query(
      `UPDATE expenses
       SET title = COALESCE($1, title),
           amount = COALESCE($2, amount),
           category = COALESCE($3, category)
       WHERE id = $4
       RETURNING *`,
      [title || null, amount || null, category || null, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json({
      message: "Expense updated",
      updated: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
};