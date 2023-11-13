import { Module } from '@nestjs/common';
import { ProductsController } from './controlers/products.controller';
import { CategoriesController } from './controlers/categories.controller';
import { ProductsService } from './services/products.service';
import { CategoriesService } from './services/categories.service';
import { BrandsService } from './services/brands.service';
import { BrandsController } from './controlers/brands.controller';

@Module({
    controllers: [ProductsController, CategoriesController, BrandsController], //declaro los controladores
    providers: [ProductsService, CategoriesService, BrandsService], //declaro los servicios 
    exports: [ProductsService], //acá PONGO los MODULOS q voy a utilizar desde Users en este caso. Osea los q se puedan importar dsd otros modulos
})
export class ProductsModule {}