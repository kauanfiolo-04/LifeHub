"use client";

import ListPagination from "@/components/common/list-pagination";
import Search from "@/components/common/search";
import TransactionCard from "@/components/finance/transactions/transaction-card";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/hooks/finance/transactions/useTransactions";
import { useDebounce } from "@/hooks/useDebounce";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LIMIT = 9; // múltiplo de 3 para fechar as linhas do grid md:grid-cols-3

export default function TransactionsPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce<string | undefined>(search, 400);

  const { data: response, isPlaceholderData } = useTransactions({
    search: debouncedSearch,
    page,
    limit: LIMIT,
  });

  const transactions = response?.data ?? [];
  const totalPages = Math.max(response?.meta.totalPages ?? 1, 1);

  const handleSearch = ({ search }: { search: string }) => {
    setSearch(search);
    setPage(1);
  };

  return (
    <>
      <div className="flex w-full justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Transactions</h1>

        <Button variant="secondary" onClick={() => router.push("/finance/transactions/new")}>
          <HugeiconsIcon icon={PlusSignIcon} />
        </Button>
      </div>

      <div>
        <Search
          searchValue={search}
          onSearch={handleSearch}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-4">
          {transactions.map(tran => (
            <TransactionCard
              key={tran.id}
              transaction={tran}
              router={router}
            />
          ))}
        </div>

        {response && response.meta.total > 0 && (
          <ListPagination 
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            disabled={isPlaceholderData}
          />
        )}
      </div>
    </>
  );
}