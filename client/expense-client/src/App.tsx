import { useEffect, useState } from "react";
import type { Expense } from "./types/Expense";
import {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} from "./api/expenseApi";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [title, setTitle] = useState("");

  // 🔥 FIX: must use useState (not plain string)
  const [amount, setAmount] = useState("");

  const [category, setCategory] = useState("");

  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getExpenses();
    setExpenses(data);
  };

  // 🔥 ADD EXPENSE
  const handleAdd = async () => {
    if (!title || !amount) return;

    await addExpense({
      title,
      amount: Number(amount), // convert string → number
      category,
    });

    // 🔥 reset fields
    setTitle("");
    setAmount("");
    setCategory("");

    fetchData();
  };

  // 🔥 DELETE
  const handleDelete = async (id: number) => {
    await deleteExpense(id);
    fetchData();
  };

  // 🔥 START EDIT
  const startEdit = (exp: Expense) => {
    setEditId(exp.id!);
    setEditTitle(exp.title);
    setEditAmount(String(exp.amount));
    setEditCategory(exp.category || "");
  };

  // 🔥 UPDATE
  const handleUpdate = async () => {
    if (!editId) return;

    await updateExpense(editId, {
      title: editTitle,
      amount: Number(editAmount),
      category: editCategory,
    });

    // reset edit state
    setEditId(null);
    setEditTitle("");
    setEditAmount("");
    setEditCategory("");

    fetchData();
  };

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl mb-4 font-bold">Expense Tracker</h1>

      {/* 🔥 ADD FORM */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <input
          className="p-2 text-white"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="p-2 text-white"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* 🔥 CATEGORY INPUT */}
        <input
          className="p-2 text-white"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button onClick={handleAdd} className="bg-blue-500 px-4">
          Add
        </button>
      </div>

      {/* 🔥 EXPENSE LIST */}
      <ul>
        {expenses.map((exp) => (
          <li
            key={exp.id}
            className="border-b py-2 flex justify-between items-center"
          >
            {editId === exp.id ? (
              <>
                {/* 🔥 EDIT MODE */}
                <div className="flex gap-2 flex-wrap">
                  <input
                    className="p-1 text-white"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />

                  <input
                    className="p-1 text-white"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                  />

                  <input
                    className="p-1 text-white"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                  />
                </div>

                <button
                  onClick={handleUpdate}
                  className="bg-green-500 px-3 py-1 rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                {/* 🔥 DISPLAY MODE */}
                <span>
                  {exp.title} - ₹{exp.amount} ({exp.category})
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(exp)}
                    className="bg-yellow-500 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(exp.id!)}
                    className="bg-red-500 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;