import { Body, Controller, Post } from '@nestjs/common';
import { OrderItemService } from '../services/order-item.service';
import { CreateOrderItemrDto } from '../dtos/order-item.dto';

@Controller('order-item')
export class OrderItemController {
    constructor(private orderItemService: OrderItemService) {}

    @Post()
    create(@Body() payload: CreateOrderItemrDto) {
        return this.orderItemService.create(payload);
    }
}
