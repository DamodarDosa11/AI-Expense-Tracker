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
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">

        {/* 🔥 TOP INPUT CARD */}
        <div className="bg-green-400 p-6 rounded-xl mb-6 shadow-md">
          <div className="grid grid-cols-3 gap-3 mb-4">
            <input
              className="p-3 rounded bg-white"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="p-3 rounded bg-white"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <input
              className="p-3 rounded bg-white"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            {editId ? "Update Expense" : "Add Expense"}
          </button>
        </div>

        {/* 🔥 EXPENSE LIST */}
        <div className="space-y-4">
          {expenses.map((e) => (
            <div
              key={e.id}
              className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
            >
              {/* TEXT */}
              <div>
                <h3 className="font-semibold text-lg">{e.title}</h3>
                <p className="text-gray-500">{e.category}</p>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex items-center gap-4">

                <span className="font-bold text-lg">₹{e.amount}</span>

                {/* 🔵 EDIT BUTTON (CIRCLE) */}
                <button
                  onClick={() => handleEdit(e)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600"
                >
                  ✏️
                </button>

                {/* 🔴 DELETE BUTTON (CIRCLE) */}
                <button
                  onClick={() => handleDelete(e.id!)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                >
                  🗑
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