import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
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

    //creo ruta trae productos
    @Get('/:id')
    getProducts(@Param('id') id: string) {
        return id;
    }
}
