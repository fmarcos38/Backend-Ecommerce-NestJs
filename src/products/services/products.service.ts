import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, FilterProductsDto, UpdataProductDto } from 'src/products/dtos/products.dto';
import { Product } from '../entities/product.entity';
import { Repository, FindOptionsWhere, Between, In } from 'typeorm';
import { Brand } from '../entities/brands.entity';
import { Category } from '../entities/category.entity';

@Injectable()
export class ProductsService {

    //constructor
    constructor(
        @InjectRepository(Product) private productRepo: Repository<Product>,
        @InjectRepository(Brand) private brandRepo: Repository<Brand>,
        @InjectRepository(Category) private categoryRepo: Repository<Category>
    ) {}
    
    
    //metodos 

    // ...

    //metodo trae todos los prods
    findAll(params?: FilterProductsDto) {
        //si trae los parametros de paginado
        if(params) {
            const where: FindOptionsWhere<Product> = {}; //creo un objeto vacio para el where
            const {limit, offset} = params;
            const {minPrice, maxPrice} = params;
            //si trae los params de filtrado por precio
            if(minPrice && maxPrice) {
                where.price = Between(minPrice, maxPrice) ;
            }
            return this.productRepo.find({
                relations: ['brand'],
                where, // añadimos el where a la consulta
                take: limit,
                skip: offset,
            });
        }
        return this.productRepo.find({relations: ['brand']});
    }

    //trae un orid
    async findOne(id: number) {
        const buscoProd = await this.productRepo.findOne({
            where: {id}, 
            relations: ['brand', 'categories']
        }); //trae el prod con su brand y categorias        
        
        if(!buscoProd) {
            throw new HttpException("El prod no existe", HttpStatus.BAD_REQUEST);
        }
        return buscoProd;
    }

    //crear prod
    //aquí tamb uso el DTO en el atributo del metodo
    async create(payload: CreateProductDto) {
        //Opcion 1 para crear un producto
        //const newProd = new Product();        
        //asigno valores a sus atributos --> Uno a uno (no es la mejor manera)
        /* newProd.name = payload.name;
        newProd.price = payload.price; */

        //opcion 2 para crear un producto
        //aquí le digo al productRepo q me cree un nuevo prod con los valores del payload
        //me evita tener q asignar uno a uno los valores
        // buscamos nuestro producto en base al id
        const prod = await this.productRepo.findOne({
            where: { id: payload.id },
            // es importante traer la relación de las categorías para poder manipularla
            relations: ['categories'],
        });

        //para la relacion con brand
        //pregunto si viene el brandId
        if(payload.brandId) {
            const brand = await this.brandRepo.findOneBy({id: payload.brandId});
            prod.brand = brand;
        }

        //relacion con categorias
        if(payload.categoriesIds) {
            const categories = await this.categoryRepo.findBy({ id: In(payload.categoriesIds) });
            prod.categories = categories;
        }

        //relacion con categorias ---> OTRA FORMA DE HACERLO <---
        /* const categories = await this.categoryRepo.find({
            where: payload.categoriesIds.map((categoryId) => ({ id: categoryId })),
        });
        prod.categories = categories; */ //asigno las categorias al prod

        return this.productRepo.save(prod); //guardo el prod en la BD
    }

    //actualizar
    async update(id: number, payload: UpdataProductDto) {
        const buscoProd = await this.productRepo.findOneBy({id});

        if(!buscoProd) {
            throw new HttpException("El prod no existe", HttpStatus.BAD_REQUEST);
        }

        //pregunto si viene el brandId
        if(payload.brandId) {
            //busco el brand
            const brand = await this.brandRepo.findOneBy({id: payload.brandId});
            //asigno el brand al prod
            buscoProd.brand = brand;
        }

        //relacion con categorias -PROBAR si funciona - SINO ver de nuevo el cap 24 y ver codigo de alumnos
        if(payload.categoriesIds) {
            //busco las categorias
            const categories = await this.categoryRepo.find({
                where: payload.categoriesIds.map((categoryId) => ({ id: categoryId })),
            });
            //asigno las categorias al prod
            buscoProd.categories = categories;
        }

        //actualizo el prod
        this.productRepo.merge(buscoProd, payload);

        //guardo el prod actualizado
        return this.productRepo.save(buscoProd);
    }
    
    //remuevo una categoria de un prod
    async removeCategoryByProduct(productId: number, categoryId: number) {
        const prod = await this.productRepo.findOne({where: {id: productId}, relations: ['categories']});
        prod.categories = prod.categories.filter((item) => item.id !== categoryId);
        return this.productRepo.save(prod);
    }

    //agregar una categoria a un prod
    async addCategoryToProduct(productId: number, categoryId: number) {
        const prod = await this.productRepo.findOne({where: {id: productId}, relations: ['categories']});
        
        const category = await this.categoryRepo.findOne({where: {id: categoryId}});
        
        //puedo realizar una validadcion para ver si la categoria ya esta asignada al prod o no existe

        prod.categories.push(category);

        return this.productRepo.save(prod);
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

