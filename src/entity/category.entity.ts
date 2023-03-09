import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 't_category' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  category_id: string;

  @Column()
  parent_id: string;

  @Column()
  category_nm: string;

  @Column()
  category_desc: string;

  @Column({ default: 0 })
  category_level: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;

  @ManyToOne(() => Category, (category) => category.parent_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_id' })
  category: Category;
}
