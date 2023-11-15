import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import { ProductsService } from 'src/products/services/products.service';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dto';

@Injectable()
export class UsersService {
    //constructor --> voy a inyectar el Servicio de Productos, para utilizar sus metodos
    //tamb inyecto una variable de entorno
    constructor(
        private productsService: ProductsService,
        private configService: ConfigService, //ejm de importacion de una variable de entorno
        @Inject('PG') private clientePostgres: Client, //inyeccion de la conexion con postgres
    ) {}

    //trae users y veo un ejem de la utilizacion de una variable de entorno
    findAll() {
        const api = this.configService.get('API_KEY');
        console.log('api: ', api);
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

    /*----service para probar la conexion con postgres------*/
    getTasksPostgres(){
        return new Promise((resolve, reject) => {
            this.clientePostgres.query('SELECT * FROM tasks', (err, res) => {
                if(err) { reject(err) }

                resolve(res.rows);
            });
        });
    }
}
