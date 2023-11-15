import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: 'varchar', length: 100, unique: true})
    name: string;
}