import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
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

//para la actualizacion -----SIN USAR LA DEPENDENCIA PARTIALTYPE 
//para q las variables sean opcionales les agrego un ?
/* export class UpdataProductDto {
    readonly id?: string;
    readonly name?: string;
    readonly price?: number;
} */