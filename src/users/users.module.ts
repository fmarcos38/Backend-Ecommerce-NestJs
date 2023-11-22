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

@Module({
    //importo a PRODUCTSMODULE --> para poder utilizar a los Services exportables de ProductsModule
    //importo a TYPEORMMODULE --> para poder utilizar a los Services exportables de TypeOrmModule
    imports:[ProductsModule, TypeOrmModule.forFeature([User, Order, Customer])], 
    controllers: [CustomerController, UsersController],
    providers: [CustomersService, UsersService],
})
export class UsersModule {}
