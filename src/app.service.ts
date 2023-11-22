import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from 'src/config';

@Injectable()
export class AppService {

  //contructor, donde inyectaré la variable declarada en --> app.module
  //como NO es una clase - usamos @Inject --> y le ponemos wl nombre del provider(arch -> app.module)
  constructor(
    @Inject('PG') private clientPg: Client,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,//inyecto desd el archivo donde DECLARO los nombres para las variables de entorno(config.ts)
    @Inject('TASKS') private tasks: any[],
  ) {}

  getHello(): string {
    const apikey = this.configService.apikey;
    return `Estoy mostrando el cont de una variable global, q fue declarada con useValue en el arch --> app.module ${apikey}`;
  }

  //service para las tareas ASYNC --> le pego a una api
  getTasks(): any[] {
    return this.tasks;
  }

  //servicio para la consulta con posgres ESTO retorno originalmnt un callback, pero lo llevamos a q sea una promesa
  getPostgres() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if(err){
          reject(err)
        }
        resolve(res.rows);
      })
    })
  }
}
