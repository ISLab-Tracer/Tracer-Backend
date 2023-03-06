import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 't_location' })
export class Location {
  @PrimaryGeneratedColumn('uuid')
  location_id: string;

  @Column()
  location_nm: string;

  @Column()
  location_desc: string;

  @Column()
  location_address: string;

  @Column()
  location_lat: number;

  @Column()
  location_lon: number;

  @Column()
  location_thumbnail: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;
}
