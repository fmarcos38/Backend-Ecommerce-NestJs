//import { PartialType } from "@nestjs/mapped-types"; //SIN SWAGGER
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCategoryDto {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty() //para swagger
    readonly id: number;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty() //para swagger
    name: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}