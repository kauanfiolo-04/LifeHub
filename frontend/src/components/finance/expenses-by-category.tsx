import { CategoryExpense } from "@/types/finance/categories.type";
import { formatCurrency } from "@/utils/format-currency";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "cn";

const FALLBACK_COLOR = "#94a3b8";

type ExpensesByCategoryProps = {
  data: CategoryExpense[];
  className?: string;
};

export function ExpensesByCategory({ data, className }: ExpensesByCategoryProps) {
  if (data.length === 0) {
    return <p className="text-sm text-muted-foreground">No expenses yet.</p>;
  }

  return (
    <Card className={cn("space-y-4", className)}>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Expenses by Category</CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3">
          {data.map((c) => (
            <li key={c.categoryId ?? "uncategorized"} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{c.name}</span>
                <span className="text-muted-foreground">
                  {formatCurrency(c.total)} · {c.percentage.toFixed(1)}%
                </span>
              </div>

              <div className="h-2 w-full rounded bg-muted">
                <div
                  className="h-2 rounded"
                  style={{
                    width: `${c.percentage}%`,
                    backgroundColor: c.color ?? FALLBACK_COLOR,
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}