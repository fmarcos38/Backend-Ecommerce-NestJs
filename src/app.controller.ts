import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('useValue')
  getHello(): string {
    return this.appService.getHello();
  }


  //endpoint para las tareas
  @Get('tasks')
  getTasks() {
    return this.appService.getTasks();
  }
}
