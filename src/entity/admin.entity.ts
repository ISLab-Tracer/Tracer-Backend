import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "t_admin"})
export class Admin{
    @PrimaryColumn()
    admin_id: String;

    @Column()
    admin_nm: String;

    @Column()
    admin_password: String;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    modified_at: Date;
}