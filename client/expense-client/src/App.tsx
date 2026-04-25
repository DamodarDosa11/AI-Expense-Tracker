import React, { useEffect, useState } from "react";
import {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} from "./api/expenseApi";
import type { Expense } from "./api/expenseApi";

import { FaEdit, FaTrash } from "react-icons/fa";

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

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">

        {/* 🔥 TITLE */}
        <h1 className="text-3xl font-bold text-slate-800 text-center mb-6 tracking-wide">
          EXPENSE TRACKER
        </h1>

        {/* 🔥 INPUT CARD */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6 border border-slate-200">
          
          <div className="grid grid-cols-3 gap-3 mb-4">
            <input
              className="p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <input
              className="p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              {editId ? "Update Expense" : "Add Expense"}
            </button>

            {editId && (
              <button
                onClick={resetForm}
                className="w-full bg-slate-400 text-white py-3 rounded-lg hover:bg-slate-500 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* 🔥 EXPENSE LIST */}
        <div className="space-y-4">
          {expenses.length === 0 ? (
            <p className="text-center text-slate-500">
              No expenses yet 🚀
            </p>
          ) : (
            expenses.map((e) => (
              <div
                key={e.id}
                className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center"
              >
                {/* LEFT */}
                <div>
                  <h3 className="font-semibold text-slate-800 text-lg">
                    {e.title}
                  </h3>
                  <p className="text-slate-500 text-sm">
                    {e.category}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-5">
                  <span className="font-bold text-slate-700 text-lg">
                    ₹{e.amount}
                  </span>

                  {/* EDIT */}
                  <button
                    onClick={() => handleEdit(e)}
                    className="text-slate-400 hover:text-indigo-600 active:scale-90 transition"
                  >
                    <FaEdit size={18} />
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => handleDelete(e.id!)}
                    className="text-slate-400 hover:text-red-500 active:scale-90 transition"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default App;