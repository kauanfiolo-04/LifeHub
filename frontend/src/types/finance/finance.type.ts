import { CategoryExpense } from "./categories.type";

export type Finance = {
  totalIncomes: number;
  totalExpenses: number;
  balance: number;
  expensesByCategory: CategoryExpense[];
};