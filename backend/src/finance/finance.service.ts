import { Injectable } from '@nestjs/common';
import { TransactionsService } from './transactions/transactions.service';
import { JwtPayload } from '../auth/types/jwt-payload.type';
import { TransactionType } from './transactions/enum/transaction-type.enum';

@Injectable()
export class FinanceService {
  constructor(private readonly transactionsService: TransactionsService) {}

  async getMetrics(payload: JwtPayload, accName?: string) {
    const transactions = await this.transactionsService.findAll(payload, accName);

    const metrics = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === TransactionType.EXPENSE) {
          acc.totalExpenses += Number(transaction.amount);
        }

        if (transaction.type === TransactionType.INCOME) {
          acc.totalIncomes += Number(transaction.amount);
        }

        return acc;
      },
      { totalExpenses: 0, totalIncomes: 0 }
    );

    return {
      ...metrics,
      balance: metrics.totalIncomes - metrics.totalExpenses
    };
  }
}
