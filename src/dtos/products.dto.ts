import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";


export class CreateProductDto {
    //estos atributos solo son de lectura
    @IsString()
    @IsNotEmpty()
    readonly id: string;

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly price: number;
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