const BASE_URL = "https://expense-backendi.onrender.com"; // 🔥 EXACT URL

// ✅ GET
export const getExpenses = async () => {
  const res = await fetch(`${BASE_URL}/expenses`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

// ✅ ADD (FIXED — NO extra headers)
export const addExpense = async (data: any) => {
  const res = await fetch(`${BASE_URL}/expenses`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add");
  return res.json();
};

// ✅ DELETE
export const deleteExpense = async (id: number) => {
  const res = await fetch(`${BASE_URL}/expenses/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

// ✅ UPDATE
export const updateExpense = async (id: number, data: any) => {
  const res = await fetch(`${BASE_URL}/expenses/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return res.json();
};