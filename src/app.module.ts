import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from "@hapi/joi";

import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { enviroments } from './enviroments';
import config from './config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    //config para variables de entorno
    ConfigModule.forRoot({ 
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',//si por consola NO elijo ambiente entoncs va con las del arch .env
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({ //validaciones de las variables de ambiente/entorno
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        //para postgres
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_HOST: Joi.string().required(),
      }),
    }),
    UsersModule, 
    ProductsModule, 
    HttpModule,
    DatabaseModule,
  ], //en este punto se declaran Modulos ESPECIFICOS(products, users)
  controllers: [ AppController, ], //en este punto SE declaron los CONTOLADORES
  providers: [
    //declaracion de un provide asyn y q recibe inyeccion de dependencias
    {
      provide: 'TASKS', //esto va a ser un array de tareas q me traigo de una api externa.
      useFactory: async (http: HttpService) => {
        const request = http.get('https://jsonplaceholder.typicode.com/todos');
        const tasks = await lastValueFrom(request);
        return tasks.data;
      },
      inject: [HttpService], //inyecto el servicio q viene al instalar la dependencia @nestjs/axios
    }
  ], //en este punto se declaran los SERVICIOS [los q son una clase usan useClass, los q son valores usan useValue]
})
export class AppModule {}
