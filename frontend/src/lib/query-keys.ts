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

  accounts: {
    all: ["accounts"] as const,
    detail: (id: string) => ["accounts", id] as const,
  },
};