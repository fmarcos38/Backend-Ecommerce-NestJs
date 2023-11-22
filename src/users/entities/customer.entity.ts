import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Order } from "./order.entity";

@Entity()
export class Customer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100})
    name: string;

    @Column({type: 'varchar', length: 100})
    lastName: string;

    @Column({type: 'varchar', length: 100})
    phone: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    //relacion 1:1 con User (bidireccional)
    @OneToOne(() => User, (user) => user.customer, { nullable: true }) //mediante user.customer se accede a la propiedad customer de la entidad User
    user: User;

    //relacion orden de compra
    @OneToMany(() => Order, (order) => order.customer)
    orders: Order[];
}