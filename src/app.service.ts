import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  //contructor, donde inyectaré la variable declarada en --> app.module
  //como NO es una clase - usamos @Inject --> y le ponemos wl nombre del provider(arch -> app.module)
  constructor(
    @Inject('API_KEY') private apikey: string,
    @Inject('TASKS') private tasks: any[],
  ) {}

  getHello(): string {
    return `Estoy mostrando el cont de una variable global, q fue declarada con useValue en el arch --> app.module ${this.apikey}`;
  }

  //service para las tareas
  getTasks(): any[] {
    return this.tasks;
  }
}
