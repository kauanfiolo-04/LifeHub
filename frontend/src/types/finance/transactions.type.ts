import { Account } from './accounts.type';
import { Category } from './categories.type';

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export type Transaction = {
  id: string;
  title: string;
  description?: string;
  type: TransactionType;
  amount: number;
  account: Account;
  category?: Category;
  date: Date;
};

export type FindTransactionsParams = {
  accountName?: string;
  search?: string;
  page?: number;
  limit?: number;
};

export type CreateTransactionRequest = {
  title: string;
  description?: string;
  type: TransactionType;
  amount: number;
  accountId: string;
  categoryId?: string;
  date: Date;
};

export interface UpdateTransactionRequest extends Partial<Omit<CreateTransactionRequest, "type">> { 
  type: TransactionType 
};

export type DeleteTransactionRequest = {
  transactionId: string;
};
