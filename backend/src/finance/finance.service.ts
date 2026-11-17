import { Injectable } from '@nestjs/common';
import { TransactionsService } from './transactions/transactions.service';
import { JwtPayload } from '../auth/types/jwt-payload.type';

@Injectable()
export class FinanceService {
  constructor(private readonly transactionsService: TransactionsService) {}

  async getMetrics(payload: JwtPayload, accName?: string) {
    const { totalIncomes, totalExpenses } = await this.transactionsService.getTotals(payload, accName);

    return {
      totalIncomes,
      totalExpenses,
      balance: totalIncomes - totalExpenses
    };
  }
}
