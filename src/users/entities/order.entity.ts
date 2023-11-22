
import { CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Customer } from "./customer.entity";
import { OrderItem } from "./order-item.entity";


@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    data: Date;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createAt: Date;
    
    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updateAt: Date;
    
    @ManyToOne(() => Customer, (customer) => customer.orders)
    customer: Customer;
    
    @OneToMany(() => OrderItem, (item) => item.order)
    items: OrderItem[];
}