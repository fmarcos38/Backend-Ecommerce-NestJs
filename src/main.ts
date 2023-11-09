import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  //activacion de LAS VALIDACIONES --> lo hago YO
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //con ESTO EVITO q se acepten parametros q NO estan declarados en mi dto
    //forbidNonWhitelisted: true, //con esta LE agrego un aviso(osea un msj) 
  }));


  await app.listen(3000);
}
bootstrap();
