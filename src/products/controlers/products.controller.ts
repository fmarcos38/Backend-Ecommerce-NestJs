import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateProductDto, FilterProductsDto, UpdataProductDto } from 'src/products/dtos/products.dto';
import { ProductsService } from 'src/products/services/products.service';

@Controller('products')
export class ProductsController {

    //en el constructor VOY a realizar la inyeccion del servicio correspondiente al Controlador
    constructor(private productsService: ProductsService) {}


    /*
        El orden de las RUTAS IMPORTA 1ro las q no son dinamicas,
        osea las q no llevan Ids, por ejem
   */

     /*----------Tipos de paginados----------*/
    //ruta con parametros por QUERY --> http://localhost:3000/products/paginado2?limit=10&offset=5
    //ruta con PAGINACION - esto retorna una LISTA de productos
    //ejemplo de ruta con destructuring de parametros
    @Get('paginado')
    getProductsPaginados(@Query() params: any) {
        const { limit, offset } = params; //obtng los parametros
        return `Limit: ${limit} - Offset: ${offset}`;
    }

    //ruta con 2 params SIN destructuring, declarandolos explicitamnt
    @Get('paginado2')
    getPaginados(
        @Query('limit') limit: number = 100, //puedo enviar el valor por defecto SINO viene
        @Query('offset') offset: number,
    ) {
        return `Limit: ${limit} - Offset: ${offset}`;
    }
    /*-------------------------------------------------------------------------------------------------*/
    
    //ruta trae Productos paginados
    //ejem de ruta paginada --> http://localhost:3000/products?limit=3&offset=0 (pag 1)
    //ejem de ruta paginada --> http://localhost:3000/products?limit=3&offset=3 (pag 2)
    //el total de prod si es de 6, en la pag 1 me trae 3 y en la pag 2 me trae los otros 3
    //ejem para filtrar entre precios: http://localhost:3000/products?minPrice=100&maxPrice=200
    @Get()
    getAllProductsPaginados(@Param() params: FilterProductsDto) {
        return this.productsService.findAll(params);
    }

    //creo ruta trae producto por ID
    @Get('/:id')
    getProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.findOne(id);
    }

    //ruta CREAR prod
    //en esta ruta SE UTILIZA EL DTO q corresponde
    @Post()
    @HttpCode(HttpStatus.CREATED) //personalizo el status code
    createProduct(@Body() payload: CreateProductDto) {
        return this.productsService.create(payload);
    }

    //metodo/ruta update(PUT)
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdataProductDto) {
        return this.productsService.update(id, payload);
    }

    //delete
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.delete(id);
    }

    //elimino categoria de un producto
    @Delete(':productId/categorias/:categoryId')
    removeCategory(
        @Param('productId', ParseIntPipe) productId: number,
        @Param('categoryId', ParseIntPipe) categoryId: number, //ParseIntPipe para parsear el id a number [ya q siempre viene como string, al pasar por la URL]
    ) {
        return this.productsService.removeCategoryByProduct(productId, categoryId);
    }

    //agrego categoria a un producto
    @Put(':productId/categorias/:categoryId')
    addCategoryToProduct(
        @Param('productId', ParseIntPipe) productId: number,
        @Param('categoryId', ParseIntPipe) categoryId: number,
    ) {
        return this.productsService.addCategoryToProduct(productId, categoryId);
    }
}
