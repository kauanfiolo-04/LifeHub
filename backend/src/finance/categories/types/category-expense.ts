export type ExpensesByCategoryRaw = {
  categoryId: string | null;
  name: string | null;
  color: string | null;
  total: string; // SUM do Postgres chega como string
};

export type CategoryExpense = {
  categoryId: string | null;
  name: string;
  color: string | null;
  total: number;
  percentage: number;
};
