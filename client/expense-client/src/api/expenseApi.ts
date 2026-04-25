const BASE_URL = "https://expense-backendi.onrender.com";

// 🔹 Types
export interface Expense {
  id?: number;
  title: string;
  amount: number;
  category: string;
}

// 🔹 GET
export const getExpenses = async (): Promise<Expense[]> => {
  const res = await fetch(`${BASE_URL}/expenses`);
  if (!res.ok) throw new Error("Failed to fetch expenses");
  return res.json();
};

// 🔹 ADD
export const addExpense = async (data: Expense): Promise<Expense> => {
  const res = await fetch(`${BASE_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // REQUIRED
    },
    body: JSON.stringify(data), // MUST match backend keys
  });

  if (!res.ok) throw new Error("Failed to add expense");
  return res.json();
};

// 🔹 DELETE
export const deleteExpense = async (id: number): Promise<void> => {
  const res = await fetch(`${BASE_URL}/expenses/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete");
};

// 🔹 UPDATE
export const updateExpense = async (
  id: number,
  data: Expense
): Promise<Expense> => {
  const res = await fetch(`${BASE_URL}/expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update");
  return res.json();
};