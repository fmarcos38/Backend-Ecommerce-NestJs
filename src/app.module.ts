import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products/products.controller';
import { BrandsController } from './controllers/brands/brands.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { UsersController } from './controllers/users/users.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { CustomersController } from './controllers/customers/customers.controller';
import { ProductsService } from './sercives/products/products.service';
import { CategoriesService } from './sercives/categories/categories.service';
import { OrdersService } from './sercives/orders/orders.service';
import { BrandsService } from './sercives/brands/brands.service';
import { CustomersService } from './sercives/customers/customers.service';
import { UsersService } from './sercives/users/users.service';

@Module({
  imports: [], //en este punto se declaran
  controllers: [
    AppController,
    ProductsController,
    BrandsController,
    CategoriesController,
    UsersController,
    OrdersController,
    CustomersController,
  ], //en este punto SE declaron los controladores
  providers: [
    AppService, 
    ProductsService, 
    CategoriesService, 
    OrdersService, 
    BrandsService, 
    CustomersService, 
    UsersService], //en este punto se declaran los SERVICIOS
})
export class AppModule {}
