import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

const API_KEY = '123456';

@Module({
  imports: [UsersModule, ProductsModule, HttpModule], //en este punto se declaran Modulos ESPECIFICOS(products, users)
  controllers: [ AppController, ], //en este punto SE declaron los CONTOLADORES
  providers: [ 
    AppService, 
    {
      provide: 'API_KEY', //aquí coloco el nombre q va a tener la variable global(q es el mismo q la contante declarada arriba)
      useValue: API_KEY, //aquí de donde toma el valor para lo q declaré en PROVIDE
    },
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
