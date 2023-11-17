//import { PartialType } from "@nestjs/mapped-types"; //sin swagger
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateUserDto {
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty() //para swagger
    readonly id: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty() //para swagger
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty() //para swagger
    readonly email: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}