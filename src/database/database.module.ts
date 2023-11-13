import { Module, Global } from '@nestjs/common';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY', //aquí coloco el nombre q va a tener la variable global(q es el mismo q la contante declarada arriba)
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY, //aquí de donde toma el valor para lo q declaré en PROVIDE
    },
  ],
  exports: ['API_KEY'], //aquí lo declaro para q sea accesible para otros modulos
})
export class DatabaseModule {}
