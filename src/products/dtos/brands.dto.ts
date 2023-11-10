import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateBrandsDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string

    @IsUrl()
    @IsNotEmpty()
    readonly image: string
}

export class UpdateBrandsDto extends PartialType(CreateBrandsDto) {}