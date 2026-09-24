import { api } from "@/lib/axios";
import { Transaction, CreateTransactionRequest, UpdateTransactionRequest } from "@/types/finance/transactions.type";

export const TransactionsService = {
  findAll: async ({ accName, search }: { accName?: string, search?: string }) => {
    const { data } = await api.get<Transaction[]>("/transactions", { params: { accountName: accName, search } });

    return data;
  },
  create: async (createTransactionDto: CreateTransactionRequest) => {
    const { data } = await api.post<Transaction>("/transactions", createTransactionDto);

    return data;
  },
  findOne: async (transactionId: string) => {
    const { data } = await api.get<Transaction>(`/transactions/${transactionId}`);

    return data;
  },
  update: async (transactionId: string, updateTransactionDTO: UpdateTransactionRequest) => {
    const { data } = await api.patch<Transaction>(`/transactions/${transactionId}`, updateTransactionDTO);

    return data;
  },
  delete: async (transactionId: string) => {
    const { data } = await api.delete<Transaction>(`/transactions/${transactionId}`);

    return data;
  },
};