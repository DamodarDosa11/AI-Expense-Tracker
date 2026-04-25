import React, { useEffect, useState } from "react";
import {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} from "./api/expenseApi";
import type { Expense } from "./api/expenseApi";

import { FaEdit, FaTrash } from "react-icons/fa";

// 🔥 Charts
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#3b82f6"];

const App: React.FC = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  const fetchExpenses = async () => {
    const data = await getExpenses();
    setExpenses(data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSubmit = async () => {
    if (!title || !amount || !category) return;

    if (editId !== null) {
      await updateExpense(editId, {
        title,
        amount: Number(amount),
        category,
      });
    } else {
      await addExpense({
        title,
        amount: Number(amount),
        category,
      });
    }

    resetForm();
    fetchExpenses();
  };

  const resetForm = () => {
    setTitle("");
    setAmount("");
    setCategory("");
    setEditId(null);
  };

  const handleEdit = (exp: Expense) => {
    setTitle(exp.title);
    setAmount(String(exp.amount));
    setCategory(exp.category);
    setEditId(exp.id!);
  };

  const handleDelete = async (id: number) => {
    await deleteExpense(id);
    fetchExpenses();
  };

  // 🔥 GROUP BY CATEGORY
  const grouped = expenses.reduce((acc: any, exp) => {
    if (!acc[exp.category]) acc[exp.category] = [];
    acc[exp.category].push(exp);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center mb-6 text-slate-800">
          EXPENSE TRACKER
        </h1>

        {/* INPUT CARD */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <div className="grid md:grid-cols-3 gap-3 mb-4">
            <input
              className="p-3 border rounded"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="p-3 border rounded"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              className="p-3 border rounded"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-3 rounded"
          >
            {editId ? "Update Expense" : "Add Expense"}
          </button>
        </div>

        {/* 🔥 CATEGORY TILES */}
        <div className="grid md:grid-cols-2 gap-6">
          {Object.keys(grouped).map((cat, index) => {
            const data = grouped[cat];

            const chartData = data.map((e: Expense) => ({
              name: e.title,
              value: e.amount,
            }));

            const total = data.reduce(
              (sum: number, e: Expense) => sum + e.amount,
              0
            );

            return (
              <div
                key={cat}
                className="bg-white p-5 rounded-xl shadow"
              >
                {/* CATEGORY HEADER */}
                <h2 className="text-xl font-semibold mb-2 text-indigo-600">
                  {cat}
                </h2>

                <p className="mb-3 text-sm text-slate-500">
                  Total: ₹{total}
                </p>

                {/* 🔥 PIE CHART */}
                <div className="w-full h-48">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={chartData}
                        dataKey="value"
                        outerRadius={70}
                      >
                        {chartData.map((_, i) => (
                          <Cell
                            key={i}
                            fill={COLORS[i % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* 🔥 LIST */}
                <div className="mt-3 space-y-2">
                  {data.map((e: Expense) => (
                    <div
                      key={e.id}
                      className="flex justify-between items-center text-sm"
                    >
                      <span>{e.title}</span>

                      <div className="flex items-center gap-3">
                        <span>₹{e.amount}</span>

                        <button
                          onClick={() => handleEdit(e)}
                          className="text-gray-400 hover:text-blue-500"
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() => handleDelete(e.id!)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default App;