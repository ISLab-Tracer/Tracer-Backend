import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 't_admin' })
export class Admin {
  @PrimaryColumn()
  admin_id: string;

  @Column()
  admin_nm: string;

  @Column()
  admin_password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;
}
