import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'pg';
import { ProductsService } from 'src/products/services/products.service';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dto';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CustomersService } from './customers.service';

@Injectable()
export class UsersService {
    //constructor --> voy a inyectar el Servicio de Productos, para utilizar sus metodos
    //tamb inyecto una variable de entorno
    constructor(
        private productsService: ProductsService,
        private configService: ConfigService, //ejm de importacion de una variable de entorno
        @Inject('PG') private clientePostgres: Client, //inyeccion de la conexion con postgres
        //para el CREUD
        @InjectRepository(User) private userRepo: Repository<User>,
        private costumerService: CustomersService, //inyeccion del servicio de Costumer
    ) {}

    //ejem de la utilizacion de una variable de entorno
    muestraApiKey() {
        const api = this.configService.get('API_KEY');
        //console.log('api: ', api);
        return "users";
    }

    //trae users
    findAll() {
        return this.userRepo.find({relations: ['customer']}); //trae la relacion con customer
    }

    //findOne
    async findOne(id: number) {
        const user = await this.userRepo.findOneBy({id});

        if(!user) {
            throw new HttpException("El prod no existe", HttpStatus.BAD_REQUEST);
        }

        return user;
    }

    //trae ordenes para un User
    async getOrdesByUSer(id: number) {
        const buscoUser = this.findOne(id);
        return{
            date: Date.now(),
            user: buscoUser,
            products: await this.productsService.findAll(), //utilizo el servicio de otro modulo
        }
    }

    async create(payload: CreateUserDto) {
        const newUser = this.userRepo.create(payload);

        //si el payload tiene customerId, entonces busco el customer y lo asigno al user
        if(payload.customerId) {
            const customer = await this.costumerService.findOne(payload.customerId);
            newUser.customer = customer;
        }

        return this.userRepo.save(newUser);
    }

    async update(id: number, payload: UpdateUserDto) {
        const user = await this.userRepo.findOneBy({id});
        this.userRepo.merge(user, payload);
        return this.userRepo.save(user);
    }

    async remove(id: number) {
        const user = await this.userRepo.findOneBy({id});

        if(!user) {
            throw new HttpException("El prod no existe", HttpStatus.BAD_REQUEST);
        }

        return this.userRepo.remove(user);
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
