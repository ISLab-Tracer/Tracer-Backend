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
  category_nm: string;

  @Column()
  category_desc: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;

  @Column()
  parent_id: string;

  @ManyToOne(() => Category, (category) => category.parent_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_id' })
  category_parent: Category;
}
