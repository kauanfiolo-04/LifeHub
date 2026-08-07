import { FieldGroup, Field, FieldLabel } from "../ui/field";
import { Skeleton } from "../ui/skeleton";

export default function TaskFormSkeleton() {
  return (
    <form className="flex flex-col w-full md:max-w-2xl gap-10">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Skeleton className="h-7 md:h-8 w-full min-w-0 rounded-md" />
        </Field>

        <Field>
          <FieldLabel htmlFor="content">Description</FieldLabel>
          <Skeleton className="flex field-sizing-content min-h-16 w-full resize-none" />
        </Field>

        <Field>
          <FieldLabel>Status</FieldLabel>
          <Skeleton className="h-7 md:h-8 w-full min-w-0 rounded-md" />
        </Field>

        <Field>
          <FieldLabel>Priority</FieldLabel>
          <Skeleton className="h-7 md:h-8 w-full min-w-0 rounded-md" />
        </Field>

        <Field>
          <FieldLabel>Due date</FieldLabel>
          <Skeleton className="h-7 md:h-8 w-full min-w-0 rounded-md" />
        </Field>
      </FieldGroup>
      
      <Skeleton className="w-full"/>
    </form>
  );
}