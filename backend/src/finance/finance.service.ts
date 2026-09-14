import { Injectable } from '@nestjs/common';
import { TransactionsService } from './transactions/transactions.service';
import { JwtPayload } from '../auth/types/jwt-payload.type';
import { TransactionType } from './transactions/enum/transaction-type.enum';

@Injectable()
export class FinanceService {
  constructor(private readonly transactionsService: TransactionsService) {}

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

    return { totalExpenses, totalIncomes, amount: totalIncomes - totalExpenses };
  }
}
