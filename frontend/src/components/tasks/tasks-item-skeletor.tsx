import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function TaskItemSkeleton() {
  return (
    <Card
      className="w-full min-h-36"
    >
      <CardContent className="h-full">
        <div className="flex flex-col justify-between w-full h-full">
          <div className="flex justify-between">
            <Skeleton className="w-[20%] h-4" />
            <Skeleton className="w-[10%] h-4" />
          </div>

          <Skeleton className="w-full h-10" />

          <div className="flex justify-between">
            <Skeleton className="w-[30%] h-4" />
            <Skeleton className="w-[30%] h-4" />
            <Skeleton className="w-[30%] h-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};