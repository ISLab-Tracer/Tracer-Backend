import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 't_project'})
export class Project{
    @PrimaryGeneratedColumn('uuid')
    project_id: string;

    @Column()
    project_title:string;

    @Column()
    project_desc: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    modified_at: Date;
}