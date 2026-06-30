import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from '../../../users/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity('categories')
@Index(['user', 'name'], { unique: true })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  color?: string;

  @ManyToOne(() => User, user => user.categories, { onDelete: 'CASCADE' })
  user!: User;

  @OneToMany(() => Transaction, transaction => transaction.category)
  transactions!: Transaction[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
