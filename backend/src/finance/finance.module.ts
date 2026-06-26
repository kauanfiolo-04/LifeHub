import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { CategoriesModule } from './categories/categories.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [AccountsModule, CategoriesModule, TransactionsModule]
})
export class FinanceModule {}
