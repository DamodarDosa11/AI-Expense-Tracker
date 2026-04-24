const BASE_URL = "https://YOUR-RENDER-BACKEND.onrender.com"; // 🔥 your real backend URL

export const getExpenses = async () => {
  const res = await fetch(`${BASE_URL}/expenses`);
  return res.json();
};

export const addExpense = async (data: any) => {
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

export const updateExpense = async (id: number, data: any) => {
  const res = await fetch(`${BASE_URL}/expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};