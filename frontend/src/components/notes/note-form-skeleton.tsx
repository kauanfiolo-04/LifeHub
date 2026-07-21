import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Skeleton } from "../ui/skeleton";

export default function NoteFormSkeleton() {
  return (
    <form className="flex flex-col w-full md:max-w-2xl gap-10">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Skeleton className="h-7 md:h-8 w-full min-w-0 rounded-md" />
        </Field>

        <Field>
          <FieldLabel htmlFor="content">Content</FieldLabel>
          <Skeleton className="flex field-sizing-content min-h-16 w-full resize-none" />
        </Field>

        <Field>
          <FieldLabel>Tags</FieldLabel>
          <Skeleton className="h-7 md:h-8 w-full min-w-0 rounded-md" />
          <FieldDescription />
        </Field>

        <Field>
          <FieldLabel>Color</FieldLabel>
          <Skeleton className="h-7 md:h-8 w-full min-w-0 rounded-md" />
        </Field>
      </FieldGroup>
      
      <div className="flex flex-col w-full gap-4">
        <Skeleton className="h-8" />

        <Skeleton className="h-8" />
      </div>
      <Skeleton />
    </form>
  );
}