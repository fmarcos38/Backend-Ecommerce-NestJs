import { Column, CreateDateColumn, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Brand } from "./brands.entity";
import { Category } from "./category.entity";

@Entity({name: 'products'}) //decorador para indicar que es una entidad y el nombre de la tabla
//@Index(['price', 'stock']) //decorador para crear indice en la columna (de forma conjunta)
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255, unique: true})
    name: string;

    @Index() //decorador para crear indice en la columna (de forma individual)
    @Column({ type: 'int'})
    price: number;

    /* @Column({ type: 'text'})
    description: string;    

    @Column({ type: 'int'})
    stock: number;

    @Column({type: 'varchar'})
    image: string */

    @CreateDateColumn({ name: 'create_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'}) //name para cambiar el nombre de la columna en la DB    createdAt: Date;

    @UpdateDateColumn({ name: 'update_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    //muchos productos una marca
    //no hace falta usar el decorador Join - la columna de la relacion VA en esta tabla
    @ManyToOne(() => Brand, (brand) => brand.products)
    @JoinColumn({ name: 'brand_id'}) //le digo q nombre va a tener la columna en la DB
    brand: Brand;

    //relacion con categorias - muchos a muchos
    @ManyToMany(() => Category, (category) => category.products)
    @JoinTable({ 
        name: 'product_category', //nombre de la tabla intermedia
        joinColumn: { name: 'product_id'}, //nombre de la columna en la tabla intermedia
        inverseJoinColumn: { name: 'category_id'} //nombre de la columna en la tabla intermedia
    }) //decorador para la tabla intermedia
    categories: Category[];
}