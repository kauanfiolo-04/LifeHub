import { HugeiconsIcon } from "@hugeicons/react";
import { CancelCircleIcon, Sorting05Icon } from "@hugeicons/core-free-icons";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Card, CardContent, CardHeader } from "../ui/card";
import { NoteSortBy } from "@/types/notes.type";

interface NoteOrderProps {
  order: NoteSortBy | undefined;
  selectOrder: (value: NoteSortBy) => void;
  clearOrder: () => void;
  isMobile: boolean;
  type?: "text" | "icon";
}

const sortingOptions = Object.keys(NoteSortBy).map(key => {
  const label = key
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());

  return {
    label: label,
    value: NoteSortBy[key as keyof typeof NoteSortBy]
  };
});

export default function NoteOrder({ order, selectOrder, clearOrder, isMobile, type = "text" }: NoteOrderProps) {
  const iconOnly = type === "icon";

  const labelToShow = (opt: NoteSortBy) => 
    sortingOptions.find(item => item.value === opt)?.label;

  return isMobile ? (
    <Drawer direction="left" fixed >
      <DrawerTrigger asChild>
        <Button 
          variant="outline" 
          className="gap-2" 
          style={{ width: !iconOnly ? "calc(50% - 8px)" : "auto"  }}
        >
          {!iconOnly && (
            <span>{order ? labelToShow(order) : "Order by"}</span>
          )}

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