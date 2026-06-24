// import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
// import { User } from '../../users/entities/user.entity';

// @Entity('oauth_accounts')
// @Unique(['provider', 'providerAccountId'])
// export class OAuthAccount {
//   @PrimaryGeneratedColumn('uuid')
//   id!: string;

//   @Column('uuid')
//   userId!: string;

//   @Column()
//   provider!: string;

//   @Column()
//   providerAccountId!: string;

//   @ManyToOne(() => User, { onDelete: 'CASCADE' })
//   user!: User;
// }
