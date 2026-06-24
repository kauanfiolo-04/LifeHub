import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { OAuthProvider } from '../enum/oauth-provider.enum';

@Entity('oauth_accounts')
@Unique(['provider', 'providerAccountId'])
export class OAuthAccount {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  userId!: string;

  @Column({ type: 'enum', enum: OAuthProvider })
  provider!: OAuthProvider;

  @Column()
  providerAccountId!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;
}
