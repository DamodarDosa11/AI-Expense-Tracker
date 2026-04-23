export type Expense = {
  id?: number;
  title: string;
  amount: number;

  // 🔥 category field added
  category?: string;

  created_at?: string;
};