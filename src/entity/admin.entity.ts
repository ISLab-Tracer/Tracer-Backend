import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 't_user' })
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  user_email: string;

  @Column()
  user_nm: string;

  @Column()
  user_password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;
}
