//import { PartialType } from "@nestjs/mapped-types"; //SIN SWAGGER
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateBrandsDto {
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