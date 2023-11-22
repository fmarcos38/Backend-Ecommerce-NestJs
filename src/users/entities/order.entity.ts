
import { CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Customer } from "./customer.entity";
import { OrderItem } from "./order-item.entity";
import { Exclude, Expose } from "class-transformer";


@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

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
    
    //una orden tiene muchos items
    @Exclude() //decorador para q  NO se muestre en las respuestas
    @OneToMany(() => OrderItem, (item) => item.order)
    items: OrderItem[];

    //aca estoy haciendo q de acuerdo a la info q me manden, me devuelva la info de los productos q me interesa (osea estoy serializando la info q me mandan)
    @Expose()
    get products() {
        //si tengop items, entonces mapeo los items y devuelvo el producto de cada item
        if (this.items) {
            //primero filtro de q no me manden mal la relacion, que no haya items vacios, null, etc
            return this.items.filter((item) => !!item)
            .map((item) => ({
                ...item.product,
                quantity: item.quantity,
            }));
        }
        return [];
    }


    //saco el total de la orden
    @Expose() // decorador para q se muestre en las respuestas
    get total() {
        //si tengo items, entonces mapeo los items y devuelvo el producto de cada item
        if (this.items) {
            //primero filtro de q no me manden mal la relacion, que no haya items vacios, null, etc
            return this.items.filter((item) => !!item)
            .reduce((sum, item) => sum + (item.quantity * item.product.price), 0);
        }
        return 0;
    }
}