import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { AccountType } from '../enum/account-type.enum';
import { User } from '../../../users/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text', unique: true })
  name!: string;

  @Column({ type: 'enum', enum: AccountType })
  type!: AccountType;

  @ManyToOne(() => User, user => user.accounts, { onDelete: 'CASCADE' })
  user!: User;

  @OneToMany(() => Transaction, transaction => transaction.account)
  transactions!: Transaction[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
