//import { PartialType } from "@nestjs/mapped-types"; //sin swagger
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateUserDto {
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty() //para swagger
    readonly id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty() //para swagger
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty() //para swagger
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty() //para swagger
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty() //para swagger
    readonly role: string;

    //atributo para la relacion usuario -> cliente(si es q al momento de crear un usuario ESTA ligado a un cliente)

    @IsNumber()
    @IsPositive()
    @IsOptional()
    @ApiProperty() //para swagger
    readonly customerId: number;

}

export class UpdateUserDto extends PartialType(CreateUserDto) {}