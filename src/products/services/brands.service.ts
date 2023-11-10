import { Injectable } from '@nestjs/common';
import { CreateBrandsDto, UpdateBrandsDto } from 'src/products/dtos/brands.dto';

@Injectable()
export class BrandsService {
    //trae users
    findAll() {
        return "users";
    }

    //findOne
    findOne(id: string) {
        return "user";
    }

    create(payload: CreateBrandsDto) {
        return "creado";
    }

    update(id: string, payload: UpdateBrandsDto) {
        return "actualizado";
    }

    remove(id: string) {
        return "elim";
    }
}
