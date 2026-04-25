import React, { useEffect, useState } from "react";

// ✅ Correct imports
import {
  getExpenses,
  addExpense,
  deleteExpense,
} from "./api/expenseApi";

// ✅ Type import separately
import type { Expense } from "./api/expenseApi";

const App: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // 🔹 Fetch all expenses
  const fetchData = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Add expense
  const handleAdd = async () => {
    if (!title || !amount || !category) {
      alert("All fields required");
      return;
    }

    try {
      await addExpense({
        title,
        amount: Number(amount), // ✅ important
        category,
      });

      // reset fields
      setTitle("");
      setAmount("");
      setCategory("");

      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Delete expense
  const handleDelete = async (id: number) => {
    try {
      await deleteExpense(id);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Expense Tracker</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <button onClick={handleAdd}>Add Expense</button>

      <ul>
        {expenses.map((exp) => (
          <li key={exp.id}>
            {exp.title} - ₹{exp.amount} ({exp.category})
            <button onClick={() => handleDelete(exp.id!)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;