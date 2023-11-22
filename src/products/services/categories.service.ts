import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/products/dtos/category.dto';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

    constructor(@InjectRepository(Category) private categoryRepo: Repository<Category>) {}

    //trae users
    async findAll() {
        return this.categoryRepo.find();
    }

    //findOne
    async findOne(id: number) {
        const buscoCat = this.categoryRepo.findOne({ where: {id}, relations: ['products']});
        if(!buscoCat) {
            return new HttpException("La categoria no existe", HttpStatus.BAD_REQUEST);
        }
        return ;
    }

    async create(payload: CreateCategoryDto) {
        const newCat = this.categoryRepo.create(payload);
        return this.categoryRepo.save(newCat);
    }

    //ver si tengo q poner la relacion como en products
    async update(id: number, payload: UpdateCategoryDto) {
        const buscoCat = await this.categoryRepo.findOneBy({id});
        if(!buscoCat) {
            return new HttpException("La categoria no existe", HttpStatus.BAD_REQUEST);
        }
        this.categoryRepo.merge(buscoCat, payload);

        return this.categoryRepo.save(buscoCat);
    }

    async remove(id: number) {
        const buscoCat = await this.categoryRepo.findOneBy({id});
        if(!buscoCat) {
            return new HttpException("La categoria no existe", HttpStatus.BAD_REQUEST);
        }

        return this.categoryRepo.delete(id);
    }
}
