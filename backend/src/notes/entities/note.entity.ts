import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100 })
  title!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column('text', { array: true, default: [] })
  tags!: string[];

  @Column({ type: 'text' })
  color?: string;

  @ManyToOne(() => User, user => user.notes, { onDelete: 'CASCADE' })
  user!: User;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
