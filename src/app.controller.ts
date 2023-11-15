import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('useValue') //rul postman --> http://localhost:3000/useValue
  getHello(): string {
    return this.appService.getHello();
  }


  //endpoint para las tareas
  @Get('tasks')
  getTasks() {
    return this.appService.getTasks();
  }


  //endpoint para servicio con postgres
  @Get('/postgers')
  getPostgres() {
    return this.appService.getPostgres();
  }
}
