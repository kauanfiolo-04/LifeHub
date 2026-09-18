import { User } from "../common";
import { Transaction } from "./transactions.type";

export enum AccountType {
  CHECKING = 'checking',
  SAVINGS = 'savings',
  CREDIT_CARD = 'credit_card',
  CASH = 'cash'
}

export type Account = {
  id: string;
  name: string;
  type: AccountType;
  user: User;
  transactions: Transaction[];
};

export type CreateAccountRequest = {
  name: string;
  type: AccountType;
};

export type UpdateAccountRequest = Partial<CreateAccountRequest>;

export type DeleteAccountRequest = {
  accountId: string;
}
