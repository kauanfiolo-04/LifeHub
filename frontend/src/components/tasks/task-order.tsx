import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDownWideNarrow, CancelCircleIcon, Sorting01Icon, Sorting05Icon } from "@hugeicons/core-free-icons";
import { Button } from "../ui/button";
import { TaskSortBy } from "@/types/tasks.type";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "../ui/drawer";
import TasksFilterList from "./tasks-filter-list";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Field, FieldGroup } from "../ui/field";
import { Card, CardContent, CardHeader } from "../ui/card";

interface TaskOrderProps {
  order: TaskSortBy | undefined;
  selectOrder: (value: TaskSortBy) => void;
  clearOrder: () => void;
  isMobile: boolean;
}

const sortingOptions = Object.keys(TaskSortBy).map(key => {
  const label = key
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());

  return {
    label: label,
    value: TaskSortBy[key as keyof typeof TaskSortBy]
  };
});

export default function TaskOrder({ order, selectOrder, clearOrder, isMobile }: TaskOrderProps) {
  const labelToShow = (opt: TaskSortBy) => 
    sortingOptions.find(item => item.value === opt)?.label;

  return isMobile ? (
    <Drawer direction="left" fixed >
      <DrawerTrigger asChild>
        <Button variant="outline" className="gap-2 w-[calc(50%-8px)]">
          <span>{order ? labelToShow(order) : "Order by"}</span>

          <HugeiconsIcon icon={Sorting05Icon} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <Card className="ring-0">
          <CardHeader className="flex justify-between items-center">
            <p className="text-xl font-semibold">Order by</p>

            <DrawerClose asChild>
              <Button variant="ghost" className="px-0">
                <HugeiconsIcon icon={CancelCircleIcon} size={14} />
              </Button>
            </DrawerClose>
          </CardHeader>

          <CardContent>
            {sortingOptions.map((opt, idx) => (
              <Button key={idx}
                className="w-full justify-start"
                variant={order === opt.value ? "outline" : "ghost"}
                onClick={() => selectOrder(opt.value)}
              >
                <span style={order === opt.value ? { color: "var(--destructive)" } : undefined}>
                  {opt.label}
                </span>
              </Button>
            ))}

            {!(!!order) && (
              <Button 
                variant="ghost"
                onClick={clearOrder}
              >
                Clear sorting
              </Button>
            )}
          </CardContent>
        </Card>
      </DrawerContent>
    </Drawer>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 w-32">
          <span>{order ? labelToShow(order) : "Order by"}</span>

          <HugeiconsIcon icon={Sorting05Icon} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          {sortingOptions.map((opt, idx) => (
            <DropdownMenuItem key={idx} asChild>
              <Button 
                className="w-full justify-start"
                variant={order === opt.value ? "outline" : "ghost"}
                onClick={() => selectOrder(opt.value)}
              >
                <span style={order === opt.value ? { color: "var(--destructive)" } : undefined}>
                  {opt.label}
                </span>
              </Button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}