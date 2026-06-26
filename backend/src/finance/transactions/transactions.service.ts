import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { UpdateTransactionDTO } from './dto/update-transaction.dto';
import { AccountsService } from '../accounts/accounts.service';
import { JwtPayload } from '../../auth/types/jwt-payload.type';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
    private readonly accountsService: AccountsService
  ) {}

  throwTransactionNotFoundException(): never {
    throw new NotFoundException('Transaction not found!');
  }

  throwAccountNotFoundException(): never {
    throw new NotFoundException('Account not found!');
  }

  async create(dto: CreateTransactionDTO, payload: JwtPayload) {
    const { accountId, categoryId: __, ...rest } = dto;

    const account = await this.accountsService.findOne(accountId);

    const newTransaction = this.transactionsRepository.create({
      ...rest,
      account
    });

    if (newTransaction.account.user.id !== payload.sub)
      throw new UnauthorizedException(`You can't create another user transaction.`);

    await this.transactionsRepository.save(newTransaction);

    return newTransaction;
  }

  async findAll() {
    const transactions = await this.transactionsRepository.find({ order: { createdAt: 'desc' } });

    return transactions;
  }

  async findOne(id: string) {
    const transaction = await this.transactionsRepository.findOneBy({ id });

    if (!transaction) this.throwTransactionNotFoundException();

    return transaction;
  }

  async update(id: string, dto: UpdateTransactionDTO, _payload: JwtPayload) {
    const updatedTransaction = await this.transactionsRepository.preload({ id, ...dto });

    if (!updatedTransaction) this.throwTransactionNotFoundException();

    // if (payload.sub !== updatedTransaction.user.id) throw new UnauthorizedException(`You can't change another user task.`);

    return await this.transactionsRepository.save(updatedTransaction);
  }

  async remove(id: string, _payload: JwtPayload) {
    const task = await this.findOne(id);

    // if (payload.sub !== task.user.id) throw new UnauthorizedException(`You can't delete another user task.`);

    return await this.transactionsRepository.remove(task);
  }
}
