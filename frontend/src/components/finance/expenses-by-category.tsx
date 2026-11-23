"use client";

import { useMemo, useState } from "react";
import { CategoryExpense } from "@/types/finance/categories.type";
import { formatCurrency } from "@/utils/format-currency";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import { PieChart02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "cn";

const FALLBACK_COLORS = [
  "#3b82f6", // blue
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ec4899", // pink
  "#8b5cf6", // violet
  "#06b6d4", // cyan
  "#f97316", // orange
  "#14b8a6", // teal
  "#6366f1", // indigo
];

type ExpensesByCategoryProps = {
  data: CategoryExpense[];
  className?: string;
};

export function ExpensesByCategory({ data, className }: ExpensesByCategoryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const totalExpenses = useMemo(() => {
    return data.reduce((sum, item) => sum + item.total, 0);
  }, [data]);

  const chartData = useMemo(() => {
    return data.map((item, index) => ({
      categoryId: item.categoryId,
      name: item.name,
      total: item.total,
      percentage: item.percentage,
      fill: item.color || FALLBACK_COLORS[index % FALLBACK_COLORS.length],
    }));
  }, [data]);

  const chartConfig = useMemo(() => {
    const config: ChartConfig = {
      total: {
        label: "Total Expenses",
      },
    };

    chartData.forEach((item) => {
      config[item.name] = {
        label: item.name,
        color: item.fill,
      };
    });

    return config;
  }, [chartData]);

  if (data.length === 0) {
    return (
      <Card className={cn(className)}>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Expenses by Category</CardTitle>
          <CardDescription>Breakdown of your spending by category</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-3 text-muted-foreground">
            <HugeiconsIcon icon={PieChart02Icon} size={24} />
          </div>
          <p className="text-sm font-medium">No expenses yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Transactions marked as expense will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  const activeItem = activeIndex !== null ? chartData[activeIndex] : null;

  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base font-semibold">Expenses by Category</CardTitle>
            <CardDescription>Breakdown of your spending across categories</CardDescription>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground block">Total</span>
            <span className="text-sm font-bold">{formatCurrency(totalExpenses)}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Donut Chart Section */}
          <div className="md:col-span-5 relative flex items-center justify-center min-h-[220px]">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[220px] w-full"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      hideLabel
                      formatter={(value, name, item) => (
                        <div className="flex items-center justify-between gap-3 text-xs w-full">
                          <div className="flex items-center gap-1.5">
                            <span
                              className="h-2 w-2 rounded-full shrink-0"
                              style={{ backgroundColor: item.payload?.fill }}
                            />
                            <span className="font-medium text-foreground">{name}</span>
                          </div>
                          <span className="font-semibold text-foreground">
                            {formatCurrency(Number(value))} ({item.payload?.percentage?.toFixed(1)}%)
                          </span>
                        </div>
                      )}
                    />
                  }
                />
                <Pie
                  data={chartData}
                  dataKey="total"
                  nameKey="name"
                  innerRadius={65}
                  outerRadius={88}
                  paddingAngle={3}
                  stroke="var(--card)"
                  strokeWidth={2}
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {chartData.map((entry, index) => {
                    const isHovered = activeIndex === index;
                    const isOtherHovered = activeIndex !== null && !isHovered;

                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.fill}
                        opacity={isOtherHovered ? 0.35 : 1}
                        className="transition-opacity duration-200 cursor-pointer"
                      />
                    );
                  })}
                </Pie>
              </PieChart>
            </ChartContainer>

            {/* Center interactive label */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              {activeItem ? (
                <>
                  <span className="text-xs text-muted-foreground font-medium truncate max-w-[110px]">
                    {activeItem.name}
                  </span>
                  <span className="text-base font-bold tracking-tight text-foreground">
                    {formatCurrency(activeItem.total)}
                  </span>
                  <span className="text-[11px] font-medium text-muted-foreground">
                    {activeItem.percentage.toFixed(1)}%
                  </span>
                </>
              ) : (
                <>
                  <span className="text-xs text-muted-foreground font-medium">Expenses</span>
                  <span className="text-base font-bold tracking-tight text-foreground">
                    {formatCurrency(totalExpenses)}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {chartData.length} {chartData.length === 1 ? "category" : "categories"}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Interactive Categories list */}
          <div className="md:col-span-7">
            <ul className="space-y-2">
              {chartData.map((c, index) => {
                const isHovered = activeIndex === index;
                const isOtherHovered = activeIndex !== null && !isHovered;

                return (
                  <li
                    key={c.categoryId ?? `cat-${index}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    className={cn(
                      "group rounded-lg p-2 transition-all duration-200 border border-transparent cursor-pointer",
                      isHovered
                        ? "bg-muted/80 border-border/50 shadow-xs"
                        : isOtherHovered
                        ? "opacity-50 hover:opacity-100"
                        : "hover:bg-muted/40"
                    )}
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="h-2.5 w-2.5 rounded-full shrink-0 transition-transform duration-200"
                          style={{
                            backgroundColor: c.fill,
                            transform: isHovered ? "scale(1.25)" : "scale(1)",
                          }}
                        />
                        <span className="font-medium text-foreground truncate">
                          {c.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-semibold text-foreground">
                          {formatCurrency(c.total)}
                        </span>
                        <span className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                          {c.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div className="h-1.5 w-full rounded-full bg-muted/60 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${c.percentage}%`,
                          backgroundColor: c.fill,
                        }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
