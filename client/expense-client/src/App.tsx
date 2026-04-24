import { useEffect, useState } from "react";
import type { Expense } from "./types/Expense";
import {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} from "./api/expenseApi";

function App() {
  // ✅ MAIN STATE
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // ✅ FORM STATE (FIXED)
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(""); // FIXED
  const [category, setCategory] = useState("");

  // ✅ EDIT STATE (FIXED)
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState(""); // FIXED
  const [editCategory, setEditCategory] = useState(""); // FIXED

  // ✅ UX STATE
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ FETCH DATA
  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      setError("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  // ✅ ADD
  const handleAdd = async () => {
    if (!title || !amount) return;

    await addExpense({
      title,
      amount: Number(amount),
      category,
    });

    setTitle("");
    setAmount("");
    setCategory("");

    fetchData();
  };

  // ✅ DELETE
  const handleDelete = async (id: number) => {
    await deleteExpense(id);
    fetchData();
  };

  // ✅ START EDIT
  const startEdit = (exp: Expense) => {
    setEditId(exp.id!);
    setEditTitle(exp.title);
    setEditAmount(String(exp.amount));
    setEditCategory(exp.category || "");
  };

  // ✅ UPDATE
  const handleUpdate = async () => {
    if (!editId) return;

    await updateExpense(editId, {
      title: editTitle,
      amount: Number(editAmount),
      category: editCategory,
    });

    setEditId(null);
    setEditTitle("");
    setEditAmount("");
    setEditCategory("");

    fetchData();
  };

  // ✅ SUMMARY
  const total = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white flex justify-center py-10 px-4">
      <div className="w-full max-w-2xl">

        {/* HEADER */}
        <h1 className="text-4xl font-bold text-center mb-8">
          💸 Expense Tracker
        </h1>

        {/* SUMMARY */}
        <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl mb-6 text-center">
          <p className="text-slate-400">Total Spending</p>
          <p className="text-2xl font-bold text-emerald-400">
            ₹{total}
          </p>
        </div>

        {/* FORM */}
        <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl mb-8">
          <div className="grid sm:grid-cols-3 gap-3">

            <input
              className="p-3 rounded-lg bg-slate-100 text-black"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="p-3 rounded-lg bg-slate-100 text-black"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <input
              className="p-3 rounded-lg bg-slate-100 text-black"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <button
            onClick={handleAdd}
            className="mt-4 w-full bg-blue-500 py-3 rounded-lg hover:bg-blue-600"
          >
            Add Expense
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-blue-400">Loading...</p>
        )}

        {/* ERROR */}
        {error && (
          <p className="text-center text-red-400">{error}</p>
        )}

        {/* EMPTY */}
        {!loading && expenses.length === 0 && (
          <p className="text-center text-slate-400">
            No expenses yet 🚀
          </p>
        )}

        {/* LIST */}
        <div className="space-y-4 mt-4">
          {expenses.map((exp) => (
            <div
              key={exp.id}
              className="bg-slate-800 border border-slate-700 p-4 rounded-xl"
            >
              {editId === exp.id ? (
                <div className="space-y-2">

                  <input
                    className="w-full p-2 rounded text-black"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />

                  <input
                    className="w-full p-2 rounded text-black"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                  />

                  <input
                    className="w-full p-2 rounded text-black"
                    value={editCategory}
                    onChange={(e) =>
                      setEditCategory(e.target.value)
                    }
                  />

                  <button
                    onClick={handleUpdate}
                    className="bg-emerald-500 w-full py-2 rounded hover:bg-emerald-600"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center">

                  <div>
                    <p className="font-semibold">{exp.title}</p>
                    <p className="text-sm text-slate-400">
                      ₹{exp.amount} • {exp.category}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(exp)}
                      className="bg-amber-500 px-3 py-1 rounded hover:bg-amber-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(exp.id!)}
                      className="bg-rose-500 px-3 py-1 rounded hover:bg-rose-600"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;