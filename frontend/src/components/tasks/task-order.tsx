import { HugeiconsIcon } from "@hugeicons/react";
import { Sorting05Icon } from "@hugeicons/core-free-icons";
import { Button } from "../ui/button";

interface TaskOrderProps {
  order: string;
  onChange: (value: string) => void;
}

export default function TaskOrder() {
  return (
    <Button variant="outline" className="gap-2 md:w-26 w-[calc(50%-8px)]">
      <span>Order</span>

      <HugeiconsIcon icon={Sorting05Icon} />
    </Button>
  );
}