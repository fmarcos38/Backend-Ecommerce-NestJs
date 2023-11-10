import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/products/dtos/category.dto';

@Injectable()
export class CategoriesService {

    //trae users
    findAll() {
        return "users";
    }

    //findOne
    findOne(id: string) {
        return "user";
    }

    create(payload: CreateCategoryDto) {
        return "creado";
    }

    update(id: string, payload: UpdateCategoryDto) {
        return "actualizado";
    }

    remove(id: string) {
        return "elim";
    }
}
