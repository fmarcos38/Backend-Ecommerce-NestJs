import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateOrderItemrDto } from '../dtos/order-item.dto';

@Injectable()
export class OrderItemService {
    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderItem) private readonly orderItemRepository: Repository<OrderItem>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    ) {}

    async create(data: CreateOrderItemrDto) {
        const order = await this.orderRepository.findOne({ where: { id: data.orderId } });
        const product = await this.productRepository.findOne({ where: { id: data.productId } });
        const orderItem = new OrderItem();
        orderItem.order = order;
        orderItem.product = product;
        orderItem.quantity = data.quantity;
        return this.orderItemRepository.save(orderItem);
    }

    //no se si está bien
    async update(id: number, changes: CreateOrderItemrDto) {
        const orderItem = await this.orderItemRepository.findOne({ where: { id } });
        this.orderItemRepository.merge(orderItem, changes);
        return this.orderItemRepository.save(orderItem);
    }

    //no se si está bien
    async delete(id: number) {
        return this.orderItemRepository.delete(id);
    }
}
