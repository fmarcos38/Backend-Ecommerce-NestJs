import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsPositive()
    readonly id: string;

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}