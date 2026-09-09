import { User } from "../common";
import { Transaction } from "./transactions.type";

export type Category = {
  id: string;
  name: string;
  color?: string;
  user: User;
  transactions: Transaction[];
};

export type CreateCategoryRequest = {
  name: string;
  color?: string;
};

export type UpdateCategoryRequest = Partial<CreateCategoryRequest>;

export type DeleteCategoryRequest = {
  categoryId: string;
}