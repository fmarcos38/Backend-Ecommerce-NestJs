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
    async findOne(id: number) {
        const buscoProd = await this.productRepo.findOneBy({id});
        if(!buscoProd) {
            throw new HttpException("El prod no existe", HttpStatus.BAD_REQUEST);
        }
        return buscoProd;
    }

    //crear prod
    //aquí tamb uso el DTO en el atributo del metodo
    create(payload: CreateProductDto) {
        //Opcion 1 para crear un producto
        //const newProd = new Product();        
        //asigno valores a sus atributos --> Uno a uno (no es la mejor manera)
        /* newProd.name = payload.name;
        newProd.price = payload.price; */

        //opcion 2 para crear un producto
        //aquí le digo al productRepo q me cree un nuevo prod con los valores del payload
        //me evita tener q asignar uno a uno los valores
        const prod = this.productRepo.create(payload);
        return this.productRepo.save(prod); //guardo el prod en la BD
    }

    //actualizar
    async update(id: number, payload: UpdataProductDto) {
        const buscoProd = await this.productRepo.findOneBy({id});

        if(!buscoProd) {
            throw new HttpException("El prod no existe", HttpStatus.BAD_REQUEST);
        }

        //actualizo el prod
        await this.productRepo.merge(buscoProd, payload);

        //guardo el prod actualizado
        return this.productRepo.save(buscoProd);
    }
    
    //elim
    async delete(id: number) {
        const buscoPos = await this.productRepo.findOneBy({id});
        
        if(!buscoPos) {
            throw new HttpException("El prod no existe", HttpStatus.BAD_REQUEST);
        }

        return this.productRepo.delete(id);
    }
}
