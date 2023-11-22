import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';
import { ProductsModule } from 'src/products/products.module';
import { User } from './entities/user.entity';
import { Order } from './entities/order.entity';
import { Customer } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { OrderItemService } from './services/order-item.service';
import { OrderItemController } from './controllers/order-item.controller';

@Module({
    //importo a PRODUCTSMODULE --> para poder utilizar a los Services exportables de ProductsModule
    //importo a TYPEORMMODULE --> para poder utilizar a los Services exportables de TypeOrmModule
    imports:[ProductsModule, TypeOrmModule.forFeature([User, Order, Customer, OrderItem])], 
    controllers: [CustomerController, UsersController, OrdersController, OrderItemController],
    providers: [CustomersService, UsersService, OrdersService, OrderItemService],
})
export class UsersModule {}
