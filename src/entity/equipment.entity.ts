import { Category, Project, User } from 'src/entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 't_equipment' })
export class Equipment {
  @PrimaryGeneratedColumn('uuid')
  equipment_id: string;

  @Column()
  category_id: string;

  @Column()
  project_id: string;

  @Column()
  user_id: string;

  @Column()
  equipment_nm: string;

  @Column()
  equipment_desc: string;

  @Column()
  equipment_thumbnail: string;

  @Column()
  equipment_price: number;

  @Column()
  equipment_qty: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;

  @ManyToOne(() => Category, (category) => category.category_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Project, (project) => project.project_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => User, (user) => user.user_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
