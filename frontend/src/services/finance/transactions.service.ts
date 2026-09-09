import { api } from "@/lib/axios";
import { Transaction, CreateTransactionRequest, UpdateTransactionRequest } from "@/types/finance/transactions.type";

export const TransactionsService = {
  findAll: async () => {
    const { data } = await api.get<Transaction[]>("/accounts");

    return data;
  },
  create: async (createTransactionDto: CreateTransactionRequest) => {
    const { data } = await api.post<Transaction>("/accounts", createTransactionDto);

    return data;
  },
  findOne: async (transactionId: string) => {
    const { data } = await api.get<Transaction>(`/accounts/${transactionId}`);

    return data;
  },
  update: async (transactionId: string, updateTransactionDTO: UpdateTransactionRequest) => {
    const { data } = await api.patch<Transaction>(`/accounts/${transactionId}`, updateTransactionDTO);

    return data;
  },
  delete: async (transactionId: string) => {
    const { data } = await api.delete<Transaction>(`/accounts/${transactionId}`);

    return data;
  },
};