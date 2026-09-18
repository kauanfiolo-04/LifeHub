import { api } from "@/lib/axios";
import { Account, CreateAccountRequest, UpdateAccountRequest } from "@/types/finance/accounts.type";

export const AccountsService = {
  findAll: async (showTransac?: boolean) => {
    const { data } = await api.get<Account[]>("/accounts", { params: { showTransac } });

    return data;
  },
  create: async (createAccountDto: CreateAccountRequest) => {
    const { data } = await api.post<Account>("/accounts", createAccountDto);

    return data;
  },
  findOne: async (accountId: string) => {
    const { data } = await api.get<Account>(`/accounts/${accountId}`);

    return data;
  },
  update: async (accountId: string, updateAccountDTO: UpdateAccountRequest) => {
    const { data } = await api.patch<Account>(`/accounts/${accountId}`, updateAccountDTO);

    return data;
  },
  delete: async (accountId: string) => {
    const { data } = await api.delete<Account>(`/accounts/${accountId}`);

    return data;
  },
};