import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products/products.controller';
import { BrandsController } from './controllers/brands/brands.controller';
import { CategoriesController } from './controllers/categories/categories.controller';

@Module({
  imports: [], //en este punto se declaran
  controllers: [
    AppController,
    ProductsController,
    BrandsController,
    CategoriesController,
  ], //en este punto SE declaron los controladores
  providers: [AppService], //en este punto se declaran
})
export class AppModule {}
