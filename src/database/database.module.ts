import { Module, Global } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from 'src/config';
import { TypeOrmModule } from '@nestjs/typeorm';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

/*-----conexion con postgres SIN variables de entorno ------*/

/* const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'my_db',
  password: '123456,
  port: 5432,
});

client.connect(); */ //realizada esta conexion PODEMOS realizar cualqr Query

/*--------------------------------*/

//modulo GLOBAL accesible para cualquiera
@Global()
@Module({
  //realizo conexion mediante ORM (como ES un MODULO --> hago la conexion en imports NO dentro de los PROVIDERS)
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY], //de aca vienen variab de entorno
      useFactory: (configService: ConfigType<typeof config>) => { //paso por param el arch config COMO siempre para la inyecc de depend
        //realizo la conexion async, y le paso las var de entorno YA sean para postgres o mysql
        const { postgresDB, postgresUser, postegresPassword, postgresPort, postgresHost } = configService.postgres; //destructuring de las var en el arch config.ts para posgres

        return {
          type: 'postgres', //especifico a q tipo de DB es. (postgres o mysql)          
          host: postgresHost,
          port: postgresPort,
          username: postgresUser,          
          password: postegresPassword,
          database: postgresDB,
          //SI VOY a utilizar la METODOLOGIA DE MIGRACIONES, el sgt parametro debe estar en FALSE
          synchronize: true, //con esta directiva ahogo q se sincronice al crear entidades Q se creen tablas en la DB
          autoLoadEntities: true, //le digo q las entidades sean autocargadas
        };
      }, 
    }),
  ],
  providers: [
    {
      provide: 'API_KEY', //aquí coloco el nombre q va a tener la variable global(q es el mismo q la contante declarada arriba)
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY, //aquí de donde toma el valor para lo q declaré en PROVIDE
    },
    //conexion con postgres [ NO es async (local al contenedor Docker) ], y solo es un objetp uso useValue
    /* {
      provide: 'PG',
      useValue: client, //este es el client CREADO arriba
    }, */
    //conexion [ Async ] a postgres
    //con useFactory , Q me permite hacer inyeccion de dependensias POR eso la arrow function
    {
      provide: 'PG', //PG es el nombre q le doy
      useFactory: (configService: ConfigType<typeof config>) => { //paso por param el arch config COMO siempre para la inyecc de depend
        //realizo la conexion async
        const { postgresDB, postgresUser, postegresPassword, postgresPort, postgresHost } = configService.postgres; //destructuring de las var en el arch config.ts para posgres

        const client = new Client({
          user: postgresUser,
          host: postgresHost,
          database: postgresDB,
          password: postegresPassword,
          port: postgresPort,
        });
        
        client.connect();
        return client;
      }, 
      inject: [config.KEY], //realizo la inyecc d dpndncia del arch config.ts
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule], //aquí lo declaro para q sea accesible para otros modulos
})
export class DatabaseModule {}
