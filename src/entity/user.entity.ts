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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;

  @ManyToOne(() => Team, (team) => team.team_id)
  @JoinColumn({ name: 'team_id' })
  team: Team;
}
