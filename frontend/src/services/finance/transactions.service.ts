import { api } from "@/lib/axios";
import { Paginated } from "@/types/api.type";
import { Transaction, CreateTransactionRequest, UpdateTransactionRequest, FindTransactionsParams } from "@/types/finance/transactions.type";

export const TransactionsService = {
  findAll: async (params: FindTransactionsParams) => {
    const { data: response } = await api.get<Paginated<Transaction>>("/transactions", { params });

    return {
      ...response,
      data: response.data.map((t) => ({ ...t, date: new Date(t.date) })),
    };
  },
  create: async (createTransactionDto: CreateTransactionRequest) => {
    const { data } = await api.post<Transaction>("/transactions", createTransactionDto);

    return data;
  },
  findOne: async (transactionId: string) => {
    const { data } = await api.get<Transaction>(`/transactions/${transactionId}`);

    return {
      ...data,
      date: new Date(data.date)
    };
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