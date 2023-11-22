import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@Injectable()
export class CustomersService {

    constructor(@InjectRepository(Customer) private customerRepo: Repository<Customer>) {}

    findAll() {
        return this.customerRepo.find();
    }

    async findOne(id: number) {
        const customer = await this.customerRepo.findOneBy({id});

        if(!customer) {
            throw new HttpException("El prod no existe", HttpStatus.BAD_REQUEST);
        }

        return customer;
    }

    create(payload: CreateCustomerDto) {
        const newCustomer = this.customerRepo.create(payload);
        return this.customerRepo.save(newCustomer);
    }

    async update(id: number, payload: UpdateCustomerDto) {
        const customer = await this.customerRepo.findOneBy({id});
        this.customerRepo.merge(customer, payload);
        return this.customerRepo.save(customer);
    }

    async remove(id: number) {
        return this.customerRepo.delete({id});
    }
}
