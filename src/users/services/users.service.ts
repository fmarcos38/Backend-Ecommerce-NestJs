import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/services/products.service';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dto';

@Injectable()
export class UsersService {
    //constructor --> voy a inyectar el Servicio de Productos, para utilizar sus metodos
    constructor(private productsService: ProductsService) {}

    //trae users
    findAll() {
        return "users";
    }

    //findOne
    findOne(id: string) {
        return "user";
    }

    //trae ordenes para un User
    getOrdesByUSer(id: string) {
        const buscoUser = this.findOne(id);
        return{
            date: Date.now(),
            user: buscoUser,
            products: this.productsService.findAll(), //utilizo el servicio de otro modulo
        }
    }

    create(payload: CreateUserDto) {
        return "creado";
    }

    update(id: string, payload: UpdateUserDto) {
        return "actualizado";
    }

    remove(id: string) {
        return "elim";
    }
}
