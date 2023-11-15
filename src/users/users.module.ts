import { Module } from '@nestjs/common';
import { CustomersController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';
import { ProductsModule } from 'src/products/products.module';
import { User } from './entities/user.entity';
import { Oreder } from './entities/order.entity';
import { Customer } from './entities/customer.entity';

@Module({
    imports:[ProductsModule, User, Oreder, Customer], //importo a PRODUCTSMODULE --> para poder utilizar a los Services exportables de Products
    controllers: [CustomersController, UsersController],
    providers: [CustomersService, UsersService],
})
export class UsersModule {}
