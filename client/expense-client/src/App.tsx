import React, { useEffect, useState } from "react";
import {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} from "./api/expenseApi";
import type { Expense } from "./api/expenseApi";

// 🔥 Icons
import { FaEdit, FaTrash } from "react-icons/fa";

const App: React.FC = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  // 🔹 Fetch expenses
  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // 🔹 Add / Update
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

  // 🔹 Reset form
  const resetForm = () => {
    setTitle("");
    setAmount("");
    setCategory("");
    setEditId(null);
  };

  // 🔹 Edit
  const handleEdit = (exp: Expense) => {
    setTitle(exp.title);
    setAmount(String(exp.amount));
    setCategory(exp.category);
    setEditId(exp.id!);
  };

  // 🔹 Delete
  const handleDelete = async (id: number) => {
    try {
      await deleteExpense(id);
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">

        {/* 🔥 INPUT CARD */}
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

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="w-full bg-black text-white py-3 rounded-lg"
            >
              {editId ? "Update Expense" : "Add Expense"}
            </button>

            {editId && (
              <button
                onClick={resetForm}
                className="w-full bg-gray-500 text-white py-3 rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* 🔥 EXPENSE LIST */}
        <div className="space-y-4">
          {expenses.length === 0 ? (
            <p className="text-center text-gray-600">No expenses yet 🚀</p>
          ) : (
            expenses.map((e) => (
              <div
                key={e.id}
                className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
              >
                {/* LEFT */}
                <div>
                  <h3 className="font-semibold text-lg">{e.title}</h3>
                  <p className="text-gray-500">{e.category}</p>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-5">
                  <span className="font-bold text-lg">₹{e.amount}</span>

                  {/* EDIT ICON */}
                  <button
                    onClick={() => handleEdit(e)}
                    className="text-gray-500 hover:text-blue-500 active:scale-90 transition"
                  >
                    <FaEdit size={18} />
                  </button>

                  {/* DELETE ICON */}
                  <button
                    onClick={() => handleDelete(e.id!)}
                    className="text-gray-500 hover:text-red-500 active:scale-90 transition"
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