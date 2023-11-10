import { Product } from "src/products/entities/product.entity";
import { User } from "./user.entity";

export class Oreder {
    data: Date;
    user: User; //utilizo la entidad User
    products: Product[]; //arreglo de productos,tipado con la entidad Productus
}