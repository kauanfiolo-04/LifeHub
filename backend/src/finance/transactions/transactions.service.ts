import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { FindOptionsRelations, FindOptionsSelect, Repository } from 'typeorm';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { UpdateTransactionDTO } from './dto/update-transaction.dto';
import { AccountsService } from '../accounts/accounts.service';
import { JwtPayload } from '../../auth/types/jwt-payload.type';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
    private readonly accountsService: AccountsService,
    private readonly categoriesService: CategoriesService
  ) {}

  throwNotFoundException(item: string): never {
    throw new NotFoundException(`${item} not found!`);
  }

  async create(dto: CreateTransactionDTO, payload: JwtPayload) {
    const { accountId, categoryId, ...rest } = dto;

    const account = await this.accountsService.findOne(accountId, { user: true }, { user: { id: true } });

    if (account.user.id !== payload.sub)
      throw new UnauthorizedException(`You can't create transactions for another user's account.`);

    const category = categoryId ? await this.categoriesService.findOne(categoryId) : undefined;

    const newTransaction = this.transactionsRepository.create({
      ...rest,
      account,
      category
    });

    await this.transactionsRepository.save(newTransaction);

    return newTransaction;
  }

  async findAll() {
    const transactions = await this.transactionsRepository.find({ order: { createdAt: 'desc' } });

    return transactions;
  }

  async findOne(id: string, relations?: FindOptionsRelations<Transaction>, select?: FindOptionsSelect<Transaction>) {
    const transaction = await this.transactionsRepository.findOne({ where: { id }, relations, select });

    if (!transaction) this.throwNotFoundException('Transaction');

    return transaction;
  }

  async update(id: string, dto: UpdateTransactionDTO, payload: JwtPayload) {
    const transaction = await this.findOne(
      id,
      { account: { user: true } },
      {
        account: {
          id: true,
          name: true,
          type: true,
          user: {
            id: true
          }
        }
      }
    );

    if (!transaction) this.throwNotFoundException('Transaction');

    const { accountId, categoryId, ...rest } = dto;

    if (accountId) {
      const account = await this.accountsService.findOne(accountId, { user: true }, { user: { id: true } });

      if (account.user.id !== payload.sub) throw new UnauthorizedException(`You can't use another user's account.`);

      transaction.account = account;
    }

    if (categoryId) {
      const category = await this.categoriesService.findOne(categoryId);

      transaction.category = category;
    }

    if (payload.sub !== transaction.account.user.id)
      throw new UnauthorizedException(`You can't change another user's transaction.`);

    Object.assign(transaction, rest);

    return await this.transactionsRepository.save(transaction);
  }

  async remove(id: string, payload: JwtPayload) {
    const transaction = await this.findOne(
      id,
      { account: { user: true } },
      {
        account: {
          id: true,
          name: true,
          type: true,
          user: {
            id: true
          }
        }
      }
    );

    if (payload.sub !== transaction.account.user.id)
      throw new UnauthorizedException(`You can't change another user's transaction.`);

    return await this.transactionsRepository.remove(transaction);
  }
}
