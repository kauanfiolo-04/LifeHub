import { Finance } from "@/types/finance/finance.type";
import { ArrowDown02Icon, ArrowUp02Icon , PercentCircleIcon, Wallet01Icon } from "@hugeicons/core-free-icons";
import { IconSvgObject } from "@/types/common";
import { cn } from "cn";
import { Card, CardContent } from "../ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { formatCurrency } from "@/utils/format-currency";

interface MetricsBoxesProps {
  metrics: Pick<Finance, "balance" | "totalIncomes" | "totalExpenses">;
}

interface MetricCardProps {
  title: string;
  value: string;
  icon: IconSvgObject;
  subtitle?: string;
  valueClassName?: string;
  iconClassName?: string;
}

export function MetricCard({ title, subtitle, icon, value, valueClassName, iconClassName }: MetricCardProps) {
  return (
    <Card className="gap-3">
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>

          <div className={cn("flex items-center justify-center rounded-lg size-9", iconClassName)}>
            <HugeiconsIcon icon={icon} size={18} />
          </div>
        </div>

        <div>
          <p className={cn("text-2xl font-bold tracking-tight", valueClassName)}>{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function MetricsBoxes({ metrics }: MetricsBoxesProps) {
  
  const savingsRate = metrics.totalIncomes > 0
    ? Math.round((metrics.balance / metrics.totalIncomes) * 100)
    : 0;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <MetricCard 
        title="Balance"
        icon={Wallet01Icon}
        value={formatCurrency(metrics.balance)}
        iconClassName="bg-blue-100 text-blue-600"
      />

      <MetricCard
        title="Incomes"
        icon={ArrowUp02Icon}
        value={formatCurrency(metrics.totalIncomes)}
        valueClassName="text-green-500"
        iconClassName="bg-green-100 text-green-600"
      />

      <MetricCard
        title="Expenses"
        icon={ArrowDown02Icon}
        value={formatCurrency(metrics.totalExpenses)}
        valueClassName="text-red-500"
        iconClassName="bg-red-100 text-red-600"
      />

      <MetricCard
        title="Savings Rate"
        icon={PercentCircleIcon}
        value={`${savingsRate}%`}
        subtitle={savingsRate > 0 ? "You're saving money! 🎉" : "Try to reduce expenses"}
        valueClassName={savingsRate > 0 ? "text-green-500" : "text-red-500"}
        iconClassName={savingsRate > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}
      />
    </div>
  );
}