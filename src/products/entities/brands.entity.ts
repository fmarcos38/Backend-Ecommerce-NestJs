import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Brand {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100, unique: true})
    name: string;

    @Column({type: 'varchar', length: 100})
    image: string;
}