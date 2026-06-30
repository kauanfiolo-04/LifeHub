import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { TaskStatus } from '../enum/task-status.enum';
import { TaskPriority } from '../enum/task-priority.enum';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.IN_PROGRESS })
  status!: TaskStatus;

  @Column({ type: 'enum', enum: TaskPriority, default: TaskPriority.LOW })
  priority!: TaskPriority;

  @Column({ type: 'timestamp', nullable: true })
  dueDate?: Date;

  @ManyToOne(() => User, user => user.tasks, { onDelete: 'CASCADE' })
  user!: User;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
