import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";

export default function TransactionFormSkeleton() {
  return (
    <form
      className='flex flex-1 md:flex-none flex-col w-full md:max-w-2xl gap-6 md:gap-10'
    >
      <FieldGroup className='flex-1 md:flex-none'>
        <Field>
          <FieldLabel>Title</FieldLabel>
          <Skeleton className="h-7 md:h-8 w-full min-w-0 rounded-md" />
        </Field>

        <Field orientation='horizontal'>
          <Field>
            <FieldLabel>Account</FieldLabel>

            <Skeleton className="h-7 md:h-8 w-full min-w-0 rounded-md" />
          </Field>

          <Field>
            <FieldLabel>Type</FieldLabel>

            <Skeleton className="h-7 md:h-8 w-full min-w-0 rounded-md" />
          </Field>
        </Field>

        <Field className='flex-1 md:flex-none'>
          <FieldLabel htmlFor='description'>Description</FieldLabel>

          <Skeleton className="min-h-20 w-full min-w-0 rounded-md" />
        </Field>

        <Field orientation={'horizontal'}>
          <Field>
            <FieldLabel>Date</FieldLabel>

            <Skeleton className="h-7 md:h-8 w-full min-w-0 rounded-md" />
          </Field>

          <Field>
            <FieldLabel>Category</FieldLabel>

            <Skeleton className="h-7 md:h-8 w-full min-w-0 rounded-md" />
          </Field>
        </Field>

        <Field>
          <FieldLabel>Amount</FieldLabel>

          <Skeleton className="h-7 md:h-8 w-full min-w-0 rounded-md" />
        </Field>
      </FieldGroup>
    </form>
  );
}