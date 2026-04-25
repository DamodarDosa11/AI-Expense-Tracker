import React, { useEffect, useState } from "react";
import {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} from "./api/expenseApi";
import type { Expense } from "./api/expenseApi";

import { FaEdit, FaTrash } from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#3b82f6"];

type GroupedExpenses = {
  [key: string]: Expense[];
};

const App: React.FC = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSubmit = async () => {
    if (!title || !amount || !category) return;

    try {
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
    } catch (err) {
      console.error(err);
    }
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
    try {
      await deleteExpense(id);
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ SAFE GROUPING
  const grouped: GroupedExpenses = expenses.reduce((acc, exp) => {
    if (!acc[exp.category]) acc[exp.category] = [];
    acc[exp.category].push(exp);
    return acc;
  }, {} as GroupedExpenses);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-center mb-6 text-slate-800">
          EXPENSE TRACKER
        </h1>

        {/* INPUT */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-3 mb-4">
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

        {/* LOADING */}
        {loading && (
          <p className="text-center text-gray-500">Loading...</p>
        )}

        {/* CATEGORY TILES */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(grouped).length === 0 && !loading && (
            <p className="text-center col-span-2 text-gray-500">
              No expenses yet 🚀
            </p>
          )}

          {Object.entries(grouped).map(([cat, data]) => {
            const total = data.reduce((sum, e) => sum + e.amount, 0);

            const chartData = data.map((e, index) => ({
              name: `${e.title}-${index}`, // 🔥 avoid duplicate crash
              value: e.amount,
            }));

            return (
              <div key={cat} className="bg-white p-5 rounded-xl shadow">
                
                <h2 className="text-xl font-semibold mb-2 text-indigo-600">
                  {cat}
                </h2>

                <p className="mb-3 text-sm text-slate-500">
                  Total: ₹{total}
                </p>

                {/* SAFE PIE */}
                {chartData.length > 0 && (
                  <div className="w-full h-48">
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie data={chartData} dataKey="value" outerRadius={70}>
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
                )}

                {/* LIST */}
                <div className="mt-3 space-y-2">
                  {data.map((e) => (
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