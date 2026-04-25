const pool = require("../db");

// ✅ GET
const getExpenses = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM expenses ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ ADD (STRICT VALIDATION)
const addExpense = async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    // 🔥 Prevent NULL inserts
    if (!title || !amount || !category) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const result = await pool.query(
      "INSERT INTO expenses (title, amount, category) VALUES ($1, $2, $3) RETURNING *",
      [title, amount, category]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ DELETE
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM expenses WHERE id=$1", [id]);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
  }
};

// ✅ UPDATE
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, category } = req.body;

    const result = await pool.query(
      "UPDATE expenses SET title=$1, amount=$2, category=$3 WHERE id=$4 RETURNING *",
      [title, amount, category, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
};