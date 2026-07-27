import { Button } from "@/components/ui/button";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function FinancePage() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Finance</h1>

        <Button variant="secondary">
          <HugeiconsIcon icon={PlusSignIcon} />
        </Button>
      </div>
    </div>
  );
}