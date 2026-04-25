import React, { useEffect, useState } from "react";

// ✅ NORMAL IMPORT (IMPORTANT)
import {
  getExpenses,
  addExpense,
  deleteExpense,
} from "./api/expenseApi";

// ✅ TYPE IMPORT (SEPARATE)
import type { Expense } from "./api/expenseApi";

const App: React.FC = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);

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

  const handleAdd = async () => {
    if (!title || !amount || !category) return;

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
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteExpense(id);
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500 to-purple-600 p-5">
      <div className="w-full max-w-xl">

        <h1 className="text-white text-3xl font-bold text-center mb-6">
          Expense Tracker
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-xl">
          
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

          <button
            onClick={handleAdd}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            Add Expense
          </button>
        </div>

        <div className="mt-6 space-y-3">
          {expenses.map((e) => (
            <div
              key={e.id}
              className="bg-white p-4 rounded-lg shadow flex justify-between"
            >
              <div>
                <h3 className="font-bold">{e.title}</h3>
                <p className="text-gray-500 text-sm">{e.category}</p>
              </div>

              <div className="text-right">
                <h3 className="font-bold">₹{e.amount}</h3>
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