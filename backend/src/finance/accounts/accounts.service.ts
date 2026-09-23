import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { FindOptionsRelations, FindOptionsSelect, Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountDTO } from './dto/create-account.dto';
import { JwtPayload } from '../../auth/types/jwt-payload.type';
import { UpdateAccountDTO } from './dto/update-account.dto';
import { Transaction } from '../transactions/entities/transaction.entity';
import { TransactionType } from '../transactions/enum/transaction-type.enum';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>
  ) {}

  throwNotFoundException(): never {
    throw new NotFoundException('Account not found!');
  }

  async create(dto: CreateAccountDTO, payload: JwtPayload) {
    const newAccount = this.accountsRepository.create({
      ...{ name: dto.name, type: dto.type },
      user: { id: payload.sub }
    });

    const savedAccount = await this.accountsRepository.save(newAccount);

    if (dto.initialBalance && dto.initialBalance > 0) {
      await this.transactionsRepository.save({
        title: 'Initial balance',
        amount: dto.initialBalance,
        type: TransactionType.INCOME,
        account: savedAccount,
        date: new Date()
      });
    }

    return newAccount;
  }

  async findAll(payload: JwtPayload, showTransac: boolean) {
    const accounts = await this.accountsRepository.find({
      where: { user: { id: payload.sub } },
      order: { createdAt: 'desc' },
      relations: {
        transactions: showTransac
      },
      select: showTransac
        ? {
            transactions: { id: true, amount: true, type: true }
          }
        : undefined
    });

    return accounts;
  }

  async findOne(id: string, relations?: FindOptionsRelations<Account>, select?: FindOptionsSelect<Account>) {
    const account = await this.accountsRepository.findOne({
      where: { id },
      relations,
      select
    });

    if (!account) this.throwNotFoundException();

    return account;
  }

  async update(id: string, dto: UpdateAccountDTO, payload: JwtPayload) {
    const account = await this.findOne(id, { user: true }, { user: { id: true } });

    if (!account) this.throwNotFoundException();

    if (payload.sub !== account.user.id) throw new UnauthorizedException(`You can't change another user account.`);

    Object.assign(account, dto);

    return await this.accountsRepository.save(account);
  }

  async remove(id: string, payload: JwtPayload) {
    const account = await this.findOne(id, { user: true, transactions: true }, { user: { id: true } });

    if (payload.sub !== account.user.id) throw new UnauthorizedException(`You can't delete another user account.`);

    if (account.transactions.length) {
      throw new BadRequestException('You cannot delete an account that has transactions.');
    }

    return await this.accountsRepository.remove(account);
  }
}
