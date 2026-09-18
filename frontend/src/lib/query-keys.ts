export const queryKeys = {
  me: ["me"] as const,

  notes: {
    all: ["notes"] as const,
    detail: (id: string) => ["notes", id] as const,
  },

  tasks: {
    all: ["tasks"] as const,
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
      detail: (id: string) => ["transactions", id] as const,
    },
    categories: {
      all: ["categories"] as const,
      detail: (id: string) => ["categories", id] as const,
    },
  }
};