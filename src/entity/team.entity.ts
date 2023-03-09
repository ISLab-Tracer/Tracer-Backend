import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 't_team' })
export class Team {
  @PrimaryGeneratedColumn('uuid')
  team_id: string;

  @Column()
  team_nm: string;

  @Column()
  team_desc: string;
}
