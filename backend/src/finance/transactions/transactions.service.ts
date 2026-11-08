import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { UpdateTransactionDTO } from './dto/update-transaction.dto';
import { AccountsService } from '../accounts/accounts.service';
import { JwtPayload } from '../../auth/types/jwt-payload.type';
import { CategoriesService } from '../categories/categories.service';
import { Account } from '../accounts/entities/account.entity';

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

  async getDetail(id: string, payload: JwtPayload) {
    const detailedItem = await this.findOne(
      id,
      { account: { user: true }, category: true },
      {
        account: {
          id: true,
          name: true,
          type: true,
          user: {
            id: true
          }
        },
        category: {
          id: true,
          name: true,
          color: true
        }
      }
    );

    if (payload.sub !== detailedItem.account.user.id)
      throw new UnauthorizedException(`You can't get data from another user's transaction.`);

    return detailedItem;
  }

  async create(dto: CreateTransactionDTO, payload: JwtPayload) {
    const { accountId, categoryId, ...rest } = dto;

    const account = await this.accountsService.getDetail(accountId, payload);

    const category = categoryId ? await this.categoriesService.getDetail(categoryId, payload) : undefined;

    const newTransaction = this.transactionsRepository.create({
      ...rest,
      account,
      category
    });

    await this.transactionsRepository.save(newTransaction);

    return newTransaction;
  }

  async findAll(payload: JwtPayload, accName?: string, search?: string) {
    const accountWhere: FindOptionsWhere<Account> = {
      user: { id: payload.sub },
      ...(accName && { name: ILike(`%${accName}%`) })
    };

    const baseWhere: FindOptionsWhere<Transaction> = { account: accountWhere };

    const where: FindOptionsWhere<Transaction>[] = [baseWhere];

    if (search) {
      const term = ILike(`%${search}%`);

      where.length = 0;
      where.push(
        { ...baseWhere, title: term },
        { ...baseWhere, description: term },
        { ...baseWhere, category: { name: term } }
      );

      if (!accName) {
        where.push({ ...baseWhere, account: { ...accountWhere, name: term } });
      }
    }

    return this.transactionsRepository.find({
      where,
      order: { date: 'desc', createdAt: 'desc' },
      relations: { account: true, category: true },
      select: {
        account: { id: true, name: true, type: true },
        category: { id: true, name: true, color: true }
      }
    });
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

    if (payload.sub !== transaction.account.user.id)
      throw new UnauthorizedException(`You can't change another user's transaction.`);

    const { accountId, categoryId, ...rest } = dto;

    if (accountId) {
      // chama getDetail ao invés de findOne devido a verificacao do dono da conta
      const account = await this.accountsService.getDetail(accountId, payload);

      transaction.account = account;
    }

    if (categoryId) {
      // chama getDetail ao invés de findOne devido a verificacao do dono da conta
      const category = await this.categoriesService.getDetail(categoryId, payload);

      transaction.category = category;
    }

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
