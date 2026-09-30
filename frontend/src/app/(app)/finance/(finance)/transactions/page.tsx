"use client";

import Search from "@/components/common/search";
import TransactionCard from "@/components/finance/transactions/transaction-card";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/hooks/finance/transactions/useTransactions";
import { useDebounce } from "@/hooks/useDebounce";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TransactionsPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce<string | undefined>(search, 400);

  const { data: transactions, refetch } = useTransactions({ search: debouncedSearch });

  const handleSearch = ({ search }: { search: string }) =>
    setSearch(search);

  useEffect(() => {
    refetch();
  }, [refetch, debouncedSearch]);

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

        <div className="grid grid-cols-1 md:grid-cols-2 mt-8">
          {(transactions ?? []).map(tran => (
            <TransactionCard 
              key={tran.id}
              transaction={tran}
              router={router}
            />
          ))}
        </div>
      </div>
    </>
  );
}