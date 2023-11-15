import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, UpdataProductDto } from 'src/products/dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

    //constructor
    constructor(@InjectRepository(Product) private productRepo: Repository<Product>) {}
    
    
    //metodos 
    //metodo trae todos los prods
    findAll() {
        return this.productRepo.find();
    }

    //trae un orid
    findOne(id: number) {
        const buscoProd = this.productRepo.findOneBy({id});
        if(!buscoProd) {
            throw new HttpException("El prod no existe", HttpStatus.BAD_REQUEST);
        }
        return buscoProd;
    }

    //crear prod
    //aquí tamb uso el DTO en el atributo del metodo
    /* create(payload: CreateProductDto) {
        const newP = {
            //id: this.products.length + 1,
            ...payload,
        };
        this.products.push(newP);

        return newP;
    } */

    //actualizar
    /* update(id: string, payload: UpdataProductDto) {
        const buscoProd = this.findOne(id);
        if(buscoProd) {
            const pos = this.products.findIndex(p => p.id === id);
            this.products[pos] = {...buscoProd, ...payload}; //lo q está entre {} es un metodo de Javascreipt
            return this.products[pos];
        }
        return null;
    } */
    
    //elim
    /* delete(id: string) {
        const buscoPos = this.products.findIndex(p => p.id === id); //sino encuentra retorna -1
        if(buscoPos === -1) {
            throw new HttpException("El prod no existe", HttpStatus.BAD_REQUEST);
        }
        this.products.splice(buscoPos, 1);
        return this.products;
    } */
}
