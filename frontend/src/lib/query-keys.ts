import { NoteSortBy } from "@/types/notes.type";
import { TaskSortBy } from "@/types/tasks.type";

export const queryKeys = {
  me: ["me"] as const,

  notes: {
    all: ["notes"] as const,
    list: (
      params: { search?: string, sortBy?: NoteSortBy, page?: number, limit?: number }
    ) => ["transactions", "list", params] as const,
    detail: (id: string) => ["notes", id] as const,
  },

  tasks: {
    all: ["tasks"] as const,
    list: (
      params: { search?: string, sortBy?: TaskSortBy, page?: number, limit?: number }
    ) => ["transactions", "list", params] as const,
    detail: (id: string) => ["tasks", id] as const,
  },

  finance: {
    getFinance: (accName?: string) => ["finance", accName] as const,
    accounts: {
      all: (showTransac?: boolean) => ["accounts", showTransac] as const,
      detail: (id: string) => ["accounts", id] as const,
    },
    transactions: {
      all: ["transactions"] as const,
      list: (
        params: { accountName?: string, search?: string, page?: number, limit?: number }
      ) => ["transactions", "list", params] as const,
      detail: (id: string) => ["transactions", id] as const,
    },
    categories: {
      all: ["categories"] as const,
      detail: (id: string) => ["categories", id] as const,
    },
  }
};