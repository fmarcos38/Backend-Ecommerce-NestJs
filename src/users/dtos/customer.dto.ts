//import { PartialType } from "@nestjs/mapped-types"; //SIN SWAGGER
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty() //para swagger
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty() //para swagger
    readonly lastName: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    @ApiProperty() //para swagger
    readonly phone: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}