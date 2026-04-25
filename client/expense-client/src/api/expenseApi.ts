const BASE_URL = "https://expense-backendi.onrender.com";

// ✅ GET
export const getExpenses = async () => {
  const res = await fetch(`${BASE_URL}/expenses`);
  return res.json();
};

// ✅ ADD (FIXED)
export const addExpense = async (data: any) => {
  const res = await fetch(`${BASE_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // ✅ BACK AGAIN
    },
    body: JSON.stringify(data),
  });

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
    headers: {
      "Content-Type": "application/json", // ✅ BACK AGAIN
    },
    body: JSON.stringify(data),
  });

  return res.json();
};