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
    <div className="min-h-screen bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      
      <div className="w-full max-w-2xl">
        
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          💸 Expense Tracker
        </h1>

        {/* 🔥 INPUT CARD */}
        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <input
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <input
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <button
            onClick={handleAdd}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition"
          >
            Add Expense
          </button>
        </div>

        {/* 🔥 EXPENSE LIST */}
        <div className="mt-6 space-y-3">
          {expenses.length === 0 ? (
            <p className="text-white text-center">No expenses yet 🚀</p>
          ) : (
            expenses.map((exp) => (
              <div
                key={exp.id}
                className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-lg">{exp.title}</h3>
                  <p className="text-gray-500 text-sm">{exp.category}</p>
                </div>

                <div className="text-right">
                  <h3 className="font-bold text-lg">₹{exp.amount}</h3>
                  <button
                    onClick={() => handleDelete(exp.id!)}
                    className="text-red-500 text-sm mt-1 hover:underline"
                  >
                    Delete
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