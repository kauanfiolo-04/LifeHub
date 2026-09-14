import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Transaction } from './transactions/entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionsService } from './transactions/transactions.service';
import { JwtPayload } from '../auth/types/jwt-payload.type';
import { AccountsService } from './accounts/accounts.service';
import { TransactionType } from './transactions/enum/transaction-type.enum';

@Injectable()
export class FinanceService {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly accountsService: AccountsService
  ) {}

  async getMetrics(payload: JwtPayload, accName?: string) {
    const transactions = await this.transactionsService.findAll(payload, accName);

    const totalExpenses = transactions
      .filter(item => item.type === TransactionType.EXPENSE)
      .reduce((acc, cur) => {
        acc += cur.amount;
        return acc;
      }, 0);

    const totalIncomes = transactions
      .filter(item => item.type === TransactionType.INCOME)
      .reduce((acc, cur) => {
        acc += cur.amount;
        return acc;
      }, 0);

    return { totalExpenses, totalIncomes };
  }
}
