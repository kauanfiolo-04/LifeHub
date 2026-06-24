import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { Note } from '../../notes/entities/note.entity';
import { Credential } from '../../auth/entities/credential.entity';
import { OAuthAccount } from '../../auth/entities/oauth-account.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ length: 100 })
  name!: string;

  @OneToMany(() => Task, task => task.user)
  tasks!: Task[];

  @OneToMany(() => Note, note => note.user)
  notes!: Note[];

  @OneToOne(() => Credential, credential => credential.user)
  credential?: Credential;

  @OneToMany(() => OAuthAccount, oAuthAccount => oAuthAccount.user)
  oAuthAccounts!: OAuthAccount[];

  @Column({ nullable: true })
  hashedRefreshToken?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
