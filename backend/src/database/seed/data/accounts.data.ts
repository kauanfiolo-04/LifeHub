import { AccountType } from '../../../finance/accounts/enum/account-type.enum';

/** Mesmo título que o AccountsService usa ao criar uma conta com saldo inicial. */
export const INITIAL_BALANCE_TITLE = 'Initial balance';

export type SeedAccount = {
  name: string;
  type: AccountType;
  initialBalance?: number;
};

// Atenção: o filtro por conta usa ILIKE '%nome%'. Nenhum nome abaixo
// pode estar contido em outro, senão filtrar por um traz os dois.
export const accountsData: SeedAccount[] = [
  { name: 'Itaú', type: AccountType.CHECKING, initialBalance: 2500 },
  { name: 'Savings', type: AccountType.SAVINGS, initialBalance: 8000 },
  { name: 'Nubank', type: AccountType.CREDIT_CARD },
  { name: 'Wallet', type: AccountType.CASH, initialBalance: 150 }
];
