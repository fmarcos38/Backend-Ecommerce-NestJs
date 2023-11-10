import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto, UpdataProductDto } from 'src/products/dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';

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
        const buscoProd = this.products.find(p => p.id === id);
        if(!buscoProd) {
            throw new HttpException("El prod no existe", HttpStatus.BAD_REQUEST);
        }
        return buscoProd;
    }

    //crear prod
    //aquí tamb uso el DTO en el atributo del metodo
    create(payload: CreateProductDto) {
        const newP = {
            //id: this.products.length + 1,
            ...payload,
        };
        this.products.push(newP);

        return newP;
    }

    //actualizar
    update(id: string, payload: UpdataProductDto) {
        const buscoProd = this.findOne(id);
        if(buscoProd) {
            const pos = this.products.findIndex(p => p.id === id);
            this.products[pos] = {...buscoProd, ...payload}; //lo q está entre {} es un metodo de Javascreipt
            return this.products[pos];
        }
        return null;
    }
    
    //elim
    delete(id: string) {
        const buscoPos = this.products.findIndex(p => p.id === id); //sino encuentra retorna -1
        if(buscoPos === -1) {
            throw new HttpException("El prod no existe", HttpStatus.BAD_REQUEST);
        }
        this.products.splice(buscoPos, 1);
        return this.products;
    }
}
