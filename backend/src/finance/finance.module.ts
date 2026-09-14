import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { CategoriesModule } from './categories/categories.module';
import { TransactionsModule } from './transactions/transactions.module';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';
import { TransactionsService } from './transactions/transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transactions/entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), AccountsModule, CategoriesModule, TransactionsModule],
  controllers: [FinanceController],
  providers: [FinanceService, TransactionsService]
})
export class FinanceModule {}
