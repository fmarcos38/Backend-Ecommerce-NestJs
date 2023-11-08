import { Injectable } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {

    private products: Product[] = [
        {
            id:'1',
            name: 'p1',
            price: 33,
        },
        {
            id:'2',
            name: 'p2',
            price: 33,
        },
    ];


    //metodos 
    //metodo trae todos los prods
    findAll() {
        return this.products;
    }

    //trae un orid
    findOne(id: string) {
        return this.products.find(p => p.id === id);
    }

    //crear prod
    create(payload: any) {
        const newP = {
            id: this.products.length + 1,
            ...payload,
        };
        this.products.push(newP);

        return newP;
    }

    //actualizar
    update(id: string, payload: any) {
        const buscoProd = this.findOne(id);
        if(buscoProd) {
            const pos = this.products.findIndex(p => p.id === id);
            this.products[pos] = {...buscoProd, ...payload}; //lo q está entre {} es un metodo de Javascreipt
            return this.products[pos];
        }
        return null;
    }
    ///elim
}
