import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 't_category' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  category_id: string;

  @Column()
  category_nm: string;

  @Column()
  category_desc: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;
}
