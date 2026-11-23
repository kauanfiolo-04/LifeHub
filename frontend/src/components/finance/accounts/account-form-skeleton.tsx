import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";

export default function AccountFormSkeleton() {
  return (
    <div className="flex flex-1 md:flex-none flex-col w-full md:max-w-2xl gap-6 md:gap-10">
      <FieldGroup className="flex-1 md:flex-none space-y-4">
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Skeleton className="h-7 md:h-8 w-full min-w-0 rounded-md" />
        </Field>

        <Field>
          <FieldLabel>Type</FieldLabel>
          <Skeleton className="h-7 md:h-8 w-full min-w-0 rounded-md" />
        </Field>
      </FieldGroup>

      <div className="flex flex-col w-full gap-2">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
}
