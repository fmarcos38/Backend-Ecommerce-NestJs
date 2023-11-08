import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  //endpoint con 2 parametros por URL - trae productos de una categoría
  @Get('/:id/products/:productId')
    getProductByCategory(
        @Param('id') id: string,
        @Param('productId') productId: string,
      ) {
        return `category ${id} - producto: ${productId}`;
  }     
}