import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { CreateProductDto, UpdataProductDto } from 'src/products/dtos/products.dto';
import { ProductsService } from 'src/products/services/products.service';

@Controller('products')
export class ProductsController {

    //en el constructor VOY a realizar la inyeccion del servicio correspondiente al Controlador
    constructor(private productsService: ProductsService) {}


    /*
        El orden de las RUTAS IMPORTA 1ro las q no son dinamicas,
        osea las q no llevan Ids, por ejem
   */


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
    getProdsPaginados(
        @Query('limit') limit: number = 100, //puedo enviar el valor por defecto SINO viene
        @Query('offset') offset: number,
    ) {
        return `Limit: ${limit} - Offset: ${offset}`;
    }

    //ruta trae Productos
    @Get()
    getProducts() {
        return this.productsService.findAll();
    }

    //creo ruta trae producto por ID
    @Get('/:id')
    getProduct(@Param('id') id: number) {
        return this.productsService.findOne(id);
    }

    //ruta CREAR prod
    //en esta ruta SE UTILIZA EL DTO q corresponde
    /*  @Post()
    @HttpCode(HttpStatus.CREATED) //personalizo el status code
    createProduct(@Body() payload: CreateProductDto) {
        return this.productsService.create(payload);
    } */

    //metodo/ruta update(PUT)
    /* @Put(':id')
    update(@Param('id') id: string, @Body() payload: UpdataProductDto) {
        return this.productsService.update(id, payload);
    } */

    //delete
    /* @Delete(':id')
    delete(@Param('id') id: string) {
        return this.productsService.delete(id);
    } */
}
