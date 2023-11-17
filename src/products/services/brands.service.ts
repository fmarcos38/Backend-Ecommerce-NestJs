import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBrandsDto, UpdateBrandsDto } from 'src/products/dtos/brands.dto';
import { Brand } from '../entities/brands.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {

    constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}
    //trae users
    async findAll() {
        return await this.brandRepo.find();
    }

    //findOne
    async findOne(id: number) {
        return await this.brandRepo.findOneBy({id});
    }

    async create(payload: CreateBrandsDto) {
        const newBrand = this.brandRepo.create(payload);
        return await this.brandRepo.save(newBrand);
    }

    async update(id: number, payload: UpdateBrandsDto) {
        const brand = await this.brandRepo.findOneBy({id});
        if(!brand) {
            return new HttpException("El brand no existe", HttpStatus.BAD_REQUEST);
        }
        this.brandRepo.merge(brand, payload);
        return await this.brandRepo.save(brand);
    }

    async remove(id: number) {
        const brand = await this.brandRepo.findOneBy({id});
        if(!brand) {
            return new HttpException("El brand no existe", HttpStatus.BAD_REQUEST);
        }
        return await this.brandRepo.delete(id); // o .delete(id);
    }
}
