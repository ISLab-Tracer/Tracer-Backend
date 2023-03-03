import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum SIGNUP_STATUS {
  APPLICATION = 'APPLICATION',
  DONE = 'DONE',
  CANCEL = 'CANCEL',
}

export class SignUp {
  @PrimaryGeneratedColumn('uuid')
  signup_id: string;

  @Column()
  signup_mail: string;

  @Column()
  signup_nm: string;

  @Column({
    type: 'enum',
    enum: SIGNUP_STATUS,
    default: SIGNUP_STATUS.APPLICATION,
  })
  signup_status: SIGNUP_STATUS;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;
}
