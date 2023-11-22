import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Customer } from "./customer.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, unique: true})
    name: string;

    @Column({ type: 'varchar', length: 100})    
    email: string;

    @Column({ type: 'varchar', length: 100})
    password: string;

    @Column({ type: 'varchar', length: 100})
    role: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    //relacion 1:1 con Customer
    @OneToOne(() => Customer, (customer) => customer.user, { nullable: true }) //no todos los users tienen customer
    @JoinColumn() //este decorador crea la referencia en la tabla de User
    customer: Customer;
    
}