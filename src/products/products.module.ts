import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './controlers/products.controller';
import { ProductsService } from './services/products.service';
import { Product } from './entities/product.entity';
import { CategoriesController } from './controlers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { Category } from './entities/category.entity';
import { BrandsController } from './controlers/brands.controller';
import { BrandsService } from './services/brands.service';
import { Brand } from './entities/brands.entity';


@Module({
    imports: [ TypeOrmModule.forFeature([Product, Brand, Category]) ], //aquí declaro las ENTIDADES q manipulará este modulo
    controllers: [ProductsController, CategoriesController, BrandsController], //declaro los controladores
    providers: [ProductsService, CategoriesService, BrandsService], //declaro los servicios 
    exports: [ProductsService], //acá PONGO los MODULOS q voy a utilizar desde Users en este caso. Osea los q se puedan importar dsd otros modulos
})
export class ProductsModule {}
