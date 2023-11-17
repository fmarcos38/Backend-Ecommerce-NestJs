//import { PartialType } from "@nestjs/mapped-types"; //SIN SWAGGER
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class CreateBrandsDto {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty() //para swagger
    readonly id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty() //para swagger
    readonly name: string

    @IsUrl()
    @IsNotEmpty()
    @ApiProperty() //para swagger
    readonly image: string
}

export class UpdateBrandsDto extends PartialType(CreateBrandsDto) {}