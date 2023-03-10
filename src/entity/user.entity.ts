import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Team } from './team.entity';

export enum USER_DIVIDE {
  NORMAL = 'NORMAL',
  ADMIN = 'ADMIN',
}
export enum USER_RANK {
  ASSISTANT = 'ASSISTANT',
  RESEARCH = 'RESEARCH',
  SENIOR = 'SENIOR',
  PRINCIPAL = 'PRINCIPAL',
  MASTER = 'MASTER',
  PHD = 'PHD',
  ETC = 'ETC',
}

@Entity({ name: 't_user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  team_id: string;

  @Column({ type: 'enum', enum: USER_DIVIDE, default: USER_DIVIDE.NORMAL })
  user_divide: USER_DIVIDE;

  @Column()
  user_email: string;

  @Column()
  user_password: string;

  @Column()
  user_nm: string;

  @Column({ default: false })
  user_usage: boolean;

  @Column({ type: 'enum', enum: USER_RANK, default: USER_RANK.MASTER })
  user_rank: USER_RANK;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;

  @ManyToOne(() => Team, (team) => team.team_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'team_id' })
  team: Team;
}
