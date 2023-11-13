import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    ParseIntPipe,
} from '@nestjs/common';
import { BrandsService } from 'src/products/services/brands.service';
import { CreateBrandsDto, UpdateBrandsDto } from 'src/products/dtos/brands.dto';


@Controller('brands')
export class BrandsController {
    constructor(private brandsService: BrandsService) { }

    @Get()
    findAll() {
        return this.brandsService.findAll();
    }

    @Get(':id')
    get(@Param('id') id: string) {
        return this.brandsService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateBrandsDto) {
        return this.brandsService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() payload: UpdateBrandsDto,
    ) {
        return this.brandsService.update(id, payload);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.brandsService.remove(id);
    }
}
