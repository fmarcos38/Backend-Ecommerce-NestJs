import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'varchar', length: 100, unique: true})
    name: string;

    @Column({ type: 'varchar', length: 100})    
    email: string;
}