const BASE_URL = "https://expense-backendi.onrender.com";

export interface Expense {
  id?: number;
  title: string;
  amount: number;
  category: string;
}

export const getExpenses = async (): Promise<Expense[]> => {
  const res = await fetch(`${BASE_URL}/expenses`);
  if (!res.ok) throw new Error("Fetch failed");
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

  if (!res.ok) throw new Error("Add failed");
  return res.json();
};

export const deleteExpense = async (id: number) => {
  await fetch(`${BASE_URL}/expenses/${id}`, {
    method: "DELETE",
  });
};