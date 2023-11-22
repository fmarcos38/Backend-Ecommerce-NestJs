import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Brand } from "./brands.entity";
import { Category } from "./category.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255, unique: true})
    name: string;

    @Column({ type: 'int'})
    price: number;

    /* @Column({ type: 'text'})
    description: string;    

    @Column({ type: 'int'})
    stock: number;

    @Column({type: 'varchar'})
    image: string */

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    //muchos productos una marca
    //no hace falta usar el decorador Join - la columna de la relacion VA en esta tabla
    @ManyToOne(() => Brand, (brand) => brand.products)
    brand: Brand;

    //relacion con categorias - muchos a muchos
    @ManyToMany(() => Category, (category) => category.products)
    @JoinTable() //decorador para la tabla intermedia
    categories: Category[];
}