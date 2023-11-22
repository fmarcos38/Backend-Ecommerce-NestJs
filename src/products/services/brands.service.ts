import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

    //trae productos x marca
    findProductsByBrand(id: number) {
        const product = this.brandRepo.findOne({
            relations: ['products'],
        });
        if (!product) {
            throw new NotFoundException(`Brand #${id} not found`);
        }
        return product;
    }
    
    //findOne
    async findOne(id: number) {
        const brand = await this.brandRepo.findOneBy({id});
        if (!brand) {
            throw new NotFoundException(`Brand #${id} not found`);
        }
        return;
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
