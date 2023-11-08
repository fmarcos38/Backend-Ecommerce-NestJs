import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/*
  El orden de las RUTAS IMPORTA 1ro las q no son dinamicas,
  osea las q no llevan Ids, por ejem
*/

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hola mundo!';
  }
}
