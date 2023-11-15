import { Product } from "src/products/entities/product.entity";
import { User } from "./user.entity";
import { ArrayContainedBy, ArrayContains, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Oreder {

    @PrimaryGeneratedColumn()
    data: Date;

    @Column({ type: 'varchar', length: 100})
    user: User; //utilizo la entidad User

    @OneToMany(() => Product, (product) => product.id)
    products: Product[]; //arreglo de productos,tipado con la entidad Productus
}