import { api } from "@/lib/axios";
import { Finance } from "@/types/finance/finance.type";

export const FinanceService = {
  finance: async (accName?: string) => {
    const { data } = await api.get<Finance>("/finance", { 
      params: accName === "all" ? {} : { accountName: accName } 
    });

    return data;
  },
};