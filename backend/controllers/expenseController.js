const pool = require("../db");

// GET
const getExpenses = async (req, res) => {
  console.log("GET HIT");

  try {
    console.log("Before DB");

    const result = await pool.query(
      "SELECT * FROM expenses ORDER BY created_at DESC"
    );

    console.log("After DB");

    res.json(result.rows);
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// POST
const addExpense = async (req, res) => {
  try {
    const data = req.body;

    // Convert single object → array
    const expensesArray = Array.isArray(data) ? data : [data];

    // Validation
    for (let exp of expensesArray) {
      if (!exp.title || !exp.amount) {
        return res.status(400).json({ error: "Invalid data in array" });
      }
    }

    // Build dynamic query
    const values = [];
    const placeholders = expensesArray.map((exp, index) => {
      const baseIndex = index * 3;
      values.push(exp.title, exp.amount, exp.category || null);
      return `($${baseIndex + 1}, $${baseIndex + 2}, $${baseIndex + 3})`;
    });

    const query = `
      INSERT INTO expenses (title, amount, category)
      VALUES ${placeholders.join(", ")}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    res.status(201).json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE
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
      deleted: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// PUT
const updateExpense = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, amount } = req.body;

    const result = await pool.query(
      `UPDATE expenses
       SET title = COALESCE($1, title),
           amount = COALESCE($2, amount)
       WHERE id = $3
       RETURNING *`,
      [title || null, amount || null, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense
};