import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private orderRepo: Repository<Order>,
        @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    ) {}

    async findAll() {
        return await this.orderRepo.find();
    }

    async findOne(id: number) {
        const order = await this.orderRepo.findOne({where : {id}, relations: ['items', 'items.product']});

        if (!order) {
            throw new Error(`Order #${id} not found`);
        }

        return order;
    }

    async create(data: CreateOrderDto) {
        const order = new Order();
        //aquí estoy creando una orden de compra y le estoy asignando un cliente (todavía no se le asigna un item)
        if (data.customerId) {
            const customer = await this.customerRepo.findOneBy({id: data.customerId});
            order.customer = customer;
        }
        return this.orderRepo.save(order);
    }

    async update(id: number, changes: UpdateOrderDto) {
        const order = await this.orderRepo.findOneBy({id}); //obtengo la orden de compra
        if(changes.customerId) { //realizo la actualización del cliente para dicha orden
            const customer = await this.customerRepo.findOneBy({id: changes.customerId});
            order.customer = customer;
        }
        return this.orderRepo.save(order);
    }

    async remove(id: number) {
        return await this.orderRepo.delete({id});
    }
}
