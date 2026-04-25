import React, { useEffect, useState } from "react";

import {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} from "./api/expenseApi";

import type { Expense } from "./api/expenseApi";

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

  // 🔥 ADD / UPDATE
  const handleSubmit = async () => {
    if (!title || !amount || !category) return;

    if (editId !== null) {
      await updateExpense(editId, {
        title,
        amount: Number(amount),
        category,
      });
      setEditId(null);
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

  // 🔥 RESET FORM
  const resetForm = () => {
    setTitle("");
    setAmount("");
    setCategory("");
    setEditId(null);
  };

  // 🔥 EDIT CLICK
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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500 to-purple-600 p-5">
      <div className="w-full max-w-xl">

        <h1 className="text-white text-3xl font-bold text-center mb-6">
          Expense Tracker
        </h1>

        {/* 🔥 FORM */}
        <div className="bg-white p-6 rounded-xl shadow-xl">
          
          {editId !== null && (
            <p className="text-blue-600 mb-3 text-sm font-semibold">
              Editing Expense ✏️
            </p>
          )}

          <div className="grid md:grid-cols-3 gap-3 mb-4">
            <input
              className="border p-3 rounded"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="border p-3 rounded"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <input
              className="border p-3 rounded"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className={`w-full py-3 rounded text-white ${
                editId !== null
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {editId !== null ? "Update Expense" : "Add Expense"}
            </button>

            {editId !== null && (
              <button
                onClick={resetForm}
                className="w-full bg-gray-400 text-white py-3 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* 🔥 LIST */}
        <div className="mt-6 space-y-3">
          {expenses.map((e) => (
            <div
              key={e.id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{e.title}</h3>
                <p className="text-gray-500 text-sm">{e.category}</p>
              </div>

              <div className="text-right space-x-3">
                <span className="font-bold block">₹{e.amount}</span>

                <button
                  onClick={() => handleEdit(e)}
                  className="text-blue-500 text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(e.id!)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default App;