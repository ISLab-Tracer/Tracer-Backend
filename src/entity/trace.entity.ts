import { Equipment, User, Location } from 'src/entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 't_trace' })
export class Trace {
  @PrimaryGeneratedColumn('uuid')
  trace_id: string;

  @Column()
  location_id: string;

  @Column()
  user_id: string;

  @Column()
  equipment_id: string;

  @Column()
  trace_title: string;

  @Column()
  trace_desc: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;

  @ManyToOne(() => Location, (location) => location.location_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @ManyToOne(() => User, (user) => user.user_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Equipment, (equipment) => equipment.equipment_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'equipment_id' })
  equipment: Equipment;
}
