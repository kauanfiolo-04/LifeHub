import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { CategoriesModule } from './categories/categories.module';
import { TransactionsModule } from './transactions/transactions.module';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';

@Module({
  imports: [AccountsModule, CategoriesModule, TransactionsModule],
  controllers: [FinanceController],
  providers: [FinanceService]
})
export class FinanceModule {}
