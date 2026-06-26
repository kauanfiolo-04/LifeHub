import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
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

    const account = await this.accountsService.findOne(accountId);

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

  async findOne(id: string) {
    const transaction = await this.transactionsRepository.findOneBy({ id });

    if (!transaction) this.throwNotFoundException('Transaction');

    return transaction;
  }

  async update(id: string, dto: UpdateTransactionDTO, payload: JwtPayload) {
    const updatedTransaction = await this.transactionsRepository.preload({ id, ...dto });

    if (!updatedTransaction) this.throwNotFoundException('Transaction');

    if (payload.sub !== updatedTransaction.account.user.id)
      throw new UnauthorizedException(`You can't change another user's transaction.`);

    return await this.transactionsRepository.save(updatedTransaction);
  }

  async remove(id: string, payload: JwtPayload) {
    const transaction = await this.findOne(id);

    if (payload.sub !== transaction.account.user.id)
      throw new UnauthorizedException(`You can't change another user's transaction.`);

    return await this.transactionsRepository.remove(transaction);
  }
}
