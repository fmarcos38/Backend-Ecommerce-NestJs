import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: 'varchar', length: 100})
    name: string;

    @Column({type: 'varchar', length: 100})
    lastName: string;

    @Column({type: 'varchar', length: 100})
    phone: string;
}