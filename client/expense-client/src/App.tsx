import React, { useEffect, useState } from "react";
import {
  getExpenses,
  addExpense,
  deleteExpense,
  Expense,
} from "./api/expenseApi";

const App: React.FC = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch expenses
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
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
        amount: Number(amount),
        category,
      });

      setTitle("");
      setAmount("");
      setCategory("");

      fetchExpenses();
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  // 🔹 Delete expense
  const handleDelete = async (id: number) => {
    try {
      await deleteExpense(id);
      fetchExpenses();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        💰 Expense Tracker
      </h1>

      {/* 🔹 Form */}
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleAdd} style={buttonStyle}>
          Add Expense
        </button>
      </div>

      {/* 🔹 List */}
      <div
        style={{
          maxWidth: "700px",
          margin: "30px auto",
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>📋 Expenses</h3>

        {loading ? (
          <p>Loading...</p>
        ) : expenses.length === 0 ? (
          <p>No expenses yet 🚀</p>
        ) : (
          expenses.map((exp) => (
            <div
              key={exp.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                background: "#334155",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            >
              <div>
                <strong>{exp.title}</strong> — ₹{exp.amount}
                <br />
                <small style={{ color: "#cbd5f5" }}>{exp.category}</small>
              </div>

              <button
                onClick={() => handleDelete(exp.id!)}
                style={deleteStyle}
              >
                ❌
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;

//
// 🔹 Styles
//

const inputStyle: React.CSSProperties = {
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  outline: "none",
  minWidth: "120px",
};

const buttonStyle: React.CSSProperties = {
  background: "#3b82f6",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "6px",
  cursor: "pointer",
};

const deleteStyle: React.CSSProperties = {
  background: "#ef4444",
  border: "none",
  color: "white",
  padding: "5px 10px",
  borderRadius: "6px",
  cursor: "pointer",
};