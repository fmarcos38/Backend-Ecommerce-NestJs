import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/products/dtos/category.dto';

@Controller('categories')
export class CategoriesController {

  @Get()
  getAllCategories() {
    return ;
  }

  //endpoint con 2 parametros por URL - trae productos de una categoría
  @Get('/:id/products/:productId')
  getProductByCategory( @Param('id') id: string, @Param('productId') productId: string ) {
    return `category ${id} - producto: ${productId}`;
  }
  
  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return;
  }

  @Put('id')
  update(@Param('id') id:string, payload: UpdateCategoryDto) {
    return;
  }

  @Delete('id')
  remove(@Param('id') id: string) {
    return;
  }
}