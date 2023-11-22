import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, ValidateIf } from "class-validator";
//import { PartialType } from "@nestjs/mapped-types"; //SIN SWAGGER
import { ApiProperty, PartialType } from "@nestjs/swagger";


export class CreateProductDto {
    //estos atributos solo son de lectura
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty() //para swagger
    readonly id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty() //para swagger
    readonly name: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty() //para swagger
    readonly price: number;

    //relacion con la tabla Brands
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty() //para swagger
    readonly brandId: number;

    //relacion con la tabla Categories
    @IsArray()
    @IsNotEmpty()
    @ApiProperty() //para swagger
    readonly categoriesIds: number[];
}

//creo dto para update con la dependencia PartialType -->
//me ahorra el codigo de mas abajo
export class UpdataProductDto extends PartialType(CreateProductDto) {}

//dto para páginados
export class FilterProductsDto {
    @IsOptional()
    @IsPositive()
    @ApiProperty() 
    limit: number;

    //cuantos elementos se van a saltar
    @Min(0) //acepta de 0 en adelante
    @ApiProperty() 
    offset: number;

    //precioo minimo
    @IsOptional()
    @IsPositive()
    minPrice: number;

    //precio maximo
    @ValidateIf((item) => item.minPrice) //valido q si viene el minPrice, el maxPrice sea mayor al minPrice
    @IsPositive()
    maxPrice: number;
}

//para la actualizacion -----SIN USAR LA DEPENDENCIA PARTIALTYPE 
//para q las variables sean opcionales les agrego un ?
/* export class UpdataProductDto {
    readonly id?: string;
    readonly name?: string;
    readonly price?: number;
} */