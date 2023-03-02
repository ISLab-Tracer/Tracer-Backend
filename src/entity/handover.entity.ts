import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Equipment } from './equipment.entity';
import { User } from './user.entity';

export enum HANDOVER_STATUS {
  CREATED = 'CREATED',
  HANDOVER = 'HANDOVER',
  DONE = 'DONE',
  CANCEL = 'CANCEL',
}

@Entity({ name: 't_handover' })
export class Handover {
  @PrimaryGeneratedColumn('uuid')
  handover_id: string;

  @Column()
  equipment_id: string;

  @Column()
  user_id: string;

  @Column()
  handover_title: string;

  @Column()
  handover_desc: string;

  @Column({
    type: 'enum',
    enum: HANDOVER_STATUS,
    default: HANDOVER_STATUS.CREATED,
  })
  handover_status: HANDOVER_STATUS;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;

  @ManyToOne(() => Equipment, (equipment) => equipment.equipment_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'equipment_id' })
  equipment: Equipment;

  @ManyToOne(() => User, (user) => user.user_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
