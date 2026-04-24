import type { Expense } from "../types/Expense";

const BASE_URL = "https://YOUR-BACKEND-URL.onrender.com";

export const getExpenses = async (): Promise<Expense[]> => {
  const res = await fetch(`${BASE_URL}/expenses`);
  return res.json();
};

export const addExpense = async (data: Expense) => {
  const res = await fetch(`${BASE_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteExpense = async (id: number) => {
  const res = await fetch(`${BASE_URL}/expenses/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const updateExpense = async (id: number, data: Partial<Expense>) => {
  const res = await fetch(`${BASE_URL}/expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};