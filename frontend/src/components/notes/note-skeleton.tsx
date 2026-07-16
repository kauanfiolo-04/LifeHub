import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function NoteSkeleton() {
  return (
    <Card className="h-52 md:h-96 aspect-3/4">
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-full h-4" />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Skeleton className="w-full h-48" />
      </CardContent>

      <CardFooter className="mt-auto">
        <Skeleton className="w-1/3 h-4 ml-auto" />
      </CardFooter>
    </Card>
  );
}