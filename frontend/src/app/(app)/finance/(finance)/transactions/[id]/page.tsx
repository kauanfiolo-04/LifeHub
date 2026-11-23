'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldGroup, Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { type Transaction, TransactionType, UpdateTransactionRequest } from '@/types/finance/transactions.type';
import { useForm, useWatch } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { HugeiconsIcon } from '@hugeicons/react';
import { Edit02Icon } from '@hugeicons/core-free-icons';
import { useMemo, useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { useParams, useRouter } from 'next/navigation';
import NoteFormSkeleton from '@/components/notes/note-form-skeleton';
import { addNotification } from '@/utils/notifications';
import { useTransaction } from '@/hooks/finance/transactions/useTransaction';
import { Account } from '@/types/finance/accounts.type';
import { Category } from '@/types/finance/categories.type';
import { useDeleteTransaction } from '@/hooks/finance/transactions/useDeleteTransaction';
import { useUpdateTransaction } from '@/hooks/finance/transactions/useUpdateTransactions';
import AccountSelect from '@/components/finance/accounts/account-select';
import { useAccounts } from '@/hooks/finance/accounts/useAccounts';
import { useCategories } from '@/hooks/finance/categories/useCategories';
import TransactionTypeSelect from '@/components/finance/transactions/transaction-type-select';
import { DatePicker } from '@/components/ui/date-picker';
import CategorySelect from '@/components/finance/categories/category-select';
import { CurrencyInput } from '@/components/common/currency-input';
import TransactionFormSkeleton from '@/components/finance/transactions/transaction-form-skeleton';

export default function Transaction() {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();

  const { data: transaction, isPending: loadingTransaction } = useTransaction(id);
  const { data: accs } = useAccounts();
  const { data: categs } = useCategories();

  const { register, handleSubmit, setValue, control, formState: { errors }, reset } = useForm<UpdateTransactionRequest>({
    values: transaction
    ? {
        title: transaction.title,
        type: transaction.type,
        date: new Date(transaction.date),
        description: transaction.description ?? '',
        accountId: transaction.account?.id,
        categoryId: transaction.category?.id,
        amount: transaction.amount,
      }
    : undefined,
  });

  const { mutateAsync: updateTransaction, isPending: updatingTransaction, isError: updateError } = useUpdateTransaction();

  const { mutateAsync: deleteTransaction, isPending: deletingTransaction, isError: deleteError } = useDeleteTransaction();

  const [isEditing, setIsEditing] = useState(false);

  const isError = deleteError || updateError;

  const isPending = updatingTransaction || deletingTransaction;

  const now = useMemo(() => new Date(), []);

  const accountId = useWatch({ control, name: 'accountId' });
  const categoryId = useWatch({ control, name: 'categoryId' });

  const selectedAcc = useMemo(
    () => accs?.find((acc) => acc.id === accountId) ?? transaction?.account,
    [accs, accountId, transaction?.account]
  );

  const selectedCateg = useMemo(
    () => categs?.find((cat) => cat.id === categoryId) ?? transaction?.category,
    [categs, categoryId, transaction?.category]
  );

  const description = useWatch({
    control,
    name: "description",
    defaultValue: undefined
  });

  const type = useWatch({
    control,
    name: "type",
    defaultValue: TransactionType.EXPENSE
  });

  const date = useWatch({
    control,
    name: "date",
    defaultValue: now
  });

  const amount = useWatch({
    control,
    name: "amount",
    defaultValue: 0
  });

  const handleAcc = (val: Account) => {
    setValue("accountId", val.id, { shouldDirty: true });
  }

  const handleType = (val: TransactionType) =>
    setValue("type", val);

  const handleDate = (date?: Date) => {
    if (date) setValue("date", date);
  }

  const handleAmount = (num: number) => {
    setValue("amount", num);
  } 

  const handleCateg = (val: Category) => {
    setValue("categoryId", val.id, { shouldDirty: true });
  }

  const handleOnSubmit = async (data: UpdateTransactionRequest) => {
    try {
      await updateTransaction(
        { id, data },
        {
          onSuccess: () => {
            setIsEditing(false);
            addNotification.success('Note edited with success!');
          },
          onError: () => addNotification.error('Try again later!')
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteNote = async () => {
    try {
      await deleteTransaction(
        { id },
        {
          onSuccess: () => {
            router.replace('/notes');
            addNotification.success('Note deleted with success!');
          },
          onError: () => addNotification.error('Try again later!')
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className='text-2xl font-bold mb-4 md:mb-8'>Transaction</h1>

      {(!transaction || loadingTransaction) ? (
        <TransactionFormSkeleton />
      ) : (
        <form
          className='flex flex-1 md:flex-none flex-col w-full md:max-w-2xl gap-6 md:gap-10'
          onSubmit={e => handleSubmit(handleOnSubmit)(e)}
        >
          <FieldGroup className='flex-1 md:flex-none'>
            <Field aria-invalid={isError || !!errors.title?.message}>
              <FieldLabel htmlFor='title'>Title</FieldLabel>
              <Input
                className='md:h-8'
                aria-invalid={isError || !!errors.title?.message}
                {...register('title', {
                  minLength: {
                    value: 1,
                    message: 'Title must not be empty'
                  }
                })}
                id='title'
                type='text'
                required
                readOnly={!isEditing}
              />

              {errors.title && <FieldDescription>{errors.title.message}</FieldDescription>}
            </Field>

            <Field orientation='horizontal'>
              <Field>
                <FieldLabel>Account</FieldLabel>

                <AccountSelect
                  accounts={accs ?? []}
                  value={selectedAcc}
                  setValue={handleAcc}
                  type='select'
                  disabled={isError || !isEditing}
                />
              </Field>

              <Field>
                <FieldLabel>Type</FieldLabel>

                <TransactionTypeSelect value={type} setValue={handleType} disabled={!isEditing} />
              </Field>
            </Field>

            <Field className='flex-1 md:flex-none' data-invalid={isError || !!errors.description?.message}>
              <FieldLabel htmlFor='description'>Description</FieldLabel>
              <Textarea
                className='flex-1 md:flex-none min-h-20 md:min-h-0 resize-none md:resize-y field-sizing-fixed'
                aria-invalid={isError || !!errors.description?.message}
                {...register('description', {
                  maxLength: {
                    value: 500,
                    message: 'description cannot exceed 500 characters'
                  }
                })}
                id='description'
                readOnly={!isEditing}
              />

              <FieldDescription className='text-end'>
                <span style={{ color: (description ?? '').length > 500 ? 'var(--destructive)' : undefined }}>
                  {description?.length ?? 0}/500
                </span>
              </FieldDescription>
            </Field>

            <Field orientation={'horizontal'}>
              <Field>
                <FieldLabel>Date</FieldLabel>

                <DatePicker value={date} onChange={handleDate} showHours={true} defaultValue={now} invalid={isError} readOnly={!isEditing} />
              </Field>

              <Field>
                <FieldLabel>Category</FieldLabel>

                <CategorySelect categories={categs ?? []} category={selectedCateg} setCategory={handleCateg} disabled={!isEditing} />
              </Field>
            </Field>

            <Field>
              <FieldLabel>Amount</FieldLabel>

              <CurrencyInput
                id='amount'
                aria-invalid={isError || !!errors.amount?.message}
                value={amount}
                onValueChange={handleAmount}
                disabled={!isEditing}
                required
              />
            </Field>
          </FieldGroup>

          {isEditing ? (
            <div className='flex w-full items-center gap-4'>
              <Button
                size='lg'
                type='button'
                variant='destructive'
                className='w-[calc(25%-8px)]'
                onClick={() => {
                  setIsEditing(false);
                  if (transaction) reset();
                }}
              >
                Cancel
              </Button>

              <Button size='lg' disabled={isPending} type='submit' className='w-[calc(75%-8px)]'>
                {isPending ? (
                  <>
                    <Spinner /> Saving...
                  </>
                ) : (
                  'Save changes'
                )}
              </Button>
            </div>
          ) : (
            <div className='flex flex-col w-full gap-2'>
              <Button type='button' size='lg' variant='secondary' onClick={() => setIsEditing(true)}>
                <HugeiconsIcon icon={Edit02Icon} className='mr-2 w-3.5! h-3.5!' size={14} /> Edit
              </Button>

              <Button size='lg' type='button' variant='destructive' onClick={handleDeleteNote}>
                Delete Transaction
              </Button>
            </div>
          )}
        </form>
      )}
    </>
  );
}
