import { Finance } from "@/types/finance/finance.type";
import { Card, CardHeader } from "../ui/card";

interface MetricsBoxesProps {
  metrics: Finance;
}

export default function MetricsBoxes({ metrics }: MetricsBoxesProps) {
  return (
    <div className="grid grid-cols-2 md:flex gap-4 items-center w-full">
      <Card className="w-40 aspect-square p-5 bg-[#006653]">
        <CardHeader>
          <h3 className="font-semibold text-lg text-center text-white">Balance</h3>
        </CardHeader>
        
        <div className="bg-white gap-2 flex items-center justify-center border rounded w-full h-full">
          <div className="w-2 h-2 rounded-full bg-[#006653]" />
          <span className="text-sm">${metrics.balance.toLocaleString("currency", { style: "decimal" })}</span>
        </div>
      </Card>

      <Card className="w-40 aspect-square p-5 bg-[#00997D]">
        <CardHeader>
          <h3 className="font-semibold text-lg text-center text-white">Incomes</h3>
        </CardHeader>
        
        <div className="bg-white gap-2 flex items-center justify-center border rounded w-full h-full">
          <div className="w-2 h-2 rounded-full bg-[#00997D]" />
          <span className="text-sm">${metrics.totalIncomes.toLocaleString("currency", { style: "decimal" })}</span>
        </div>
      </Card>

      <Card className="w-40 aspect-square p-5 bg-[#00CCA7]">
        <CardHeader>
          <h3 className="font-semibold text-lg text-center text-white">Expenses</h3>
        </CardHeader>
        
        <div className="bg-white gap-2 flex items-center justify-center border rounded w-full h-full">
          <div className="w-2 h-2 rounded-full bg-[#00CCA7]" />
          <span className="text-sm">${metrics.totalExpenses.toLocaleString("currency", { style: "decimal" })}</span>
        </div>
      </Card>
    </div>
  );
}