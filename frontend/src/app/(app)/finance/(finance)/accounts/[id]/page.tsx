'use client';

import { useParams, useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldGroup, Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { HugeiconsIcon } from '@hugeicons/react';
import { Edit02Icon } from '@hugeicons/core-free-icons';
import { addNotification } from '@/utils/notifications';
import { getErrorMessage } from '@/utils/get-error-message';
import { useAccount } from '@/hooks/finance/accounts/useAccount';
import { useUpdateAccount } from '@/hooks/finance/accounts/useUpdateAccount';
import { useDeleteAccount } from '@/hooks/finance/accounts/useDeleteAccount';
import { AccountType, UpdateAccountRequest } from '@/types/finance/accounts.type';
import AccountTypeSelect from '@/components/finance/accounts/account-type-select';
import AccountFormSkeleton from '@/components/finance/accounts/account-form-skeleton';
import LastTransactions from '@/components/finance/last-transactions';

export default function AccountDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: account, isPending: loadingAccount } = useAccount(id);

  const { register, handleSubmit, setValue, control, formState: { errors }, reset } = useForm<UpdateAccountRequest>({
    values: account
      ? {
          name: account.name,
          type: account.type,
        }
      : undefined,
  });

  const { mutateAsync: updateAccount, isPending: updatingAccount, isError: updateError } = useUpdateAccount();

  const { mutateAsync: deleteAccount, isPending: deletingAccount, isError: deleteError } = useDeleteAccount();

  const [isEditing, setIsEditing] = useState(false);

  const isError = deleteError || updateError;
  const isPending = updatingAccount || deletingAccount;

  const type = useWatch({
    control,
    name: 'type',
    defaultValue: AccountType.CHECKING,
  });

  const handleType = (val: AccountType) => setValue('type', val, { shouldDirty: true });

  const handleOnSubmit = async (data: UpdateAccountRequest) => {
    try {
      await updateAccount(
        { id, data: { name: data.name, type } },
        {
          onSuccess: () => {
            setIsEditing(false);
            addNotification.success('Account edited with success!');
          },
          onError: (e) => {
            const message = getErrorMessage(e);
            addNotification.error(Array.isArray(message) ? message.join(', ') : message);
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount(
        { id },
        {
          onSuccess: () => {
            router.replace('/finance/accounts');
            addNotification.success('Account deleted with success!');
          },
          onError: (e) => {
            const message = getErrorMessage(e);
            addNotification.error(Array.isArray(message) ? message.join(', ') : message);
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <div className='flex flex-col max-w-2xl'>
        <h1 className='text-2xl font-bold mb-4 md:mb-8'>Account</h1>

        {!account || loadingAccount ? (
          <AccountFormSkeleton />
        ) : (
          <form
            className='flex flex-1 md:flex-none flex-col w-full gap-6 md:gap-10'
            onSubmit={(e) => handleSubmit(handleOnSubmit)(e)}
          >
            <FieldGroup className='flex-1 md:flex-none'>
              <Field aria-invalid={isError || !!errors.name?.message}>
                <FieldLabel htmlFor='name'>Name</FieldLabel>
                <Input
                  className='md:h-8'
                  aria-invalid={isError || !!errors.name?.message}
                  {...register('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 1,
                      message: 'Name must not be empty',
                    },
                  })}
                  id='name'
                  type='text'
                  required
                  readOnly={!isEditing}
                />

                {errors.name && (
                  <FieldDescription>{errors.name.message}</FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel>Type</FieldLabel>
                <AccountTypeSelect
                  value={type ?? AccountType.CHECKING}
                  setValue={handleType}
                  disabled={!isEditing}
                />
              </Field>
            </FieldGroup>
            
            {account && (!isEditing) && (
              <LastTransactions accountName={account.name} limit={5} />
            )}

            {isEditing ? (
              <div className='flex w-full items-center gap-4'>
                <Button
                  size='lg'
                  type='button'
                  variant='destructive'
                  className='w-[calc(25%-8px)]'
                  onClick={() => {
                    setIsEditing(false);
                    if (account) reset();
                  }}
                  disabled={isPending}
                >
                  Cancel
                </Button>

                <Button
                  size='lg'
                  disabled={isPending}
                  type='submit'
                  className='w-[calc(75%-8px)]'
                >
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
                <Button
                  type='button'
                  size='lg'
                  variant='secondary'
                  onClick={() => setIsEditing(true)}
                >
                  <HugeiconsIcon
                    icon={Edit02Icon}
                    className='mr-2 w-3.5! h-3.5!'
                    size={14}
                  />{' '}
                  Edit
                </Button>

                <Button
                  size='lg'
                  type='button'
                  variant='destructive'
                  onClick={handleDeleteAccount}
                  disabled={isPending}
                >
                  {deletingAccount ? (
                    <>
                      <Spinner /> Deleting...
                    </>
                  ) : (
                    'Delete Account'
                  )}
                </Button>
              </div>
            )}
          </form>
        )}
      </div>
  );
}
