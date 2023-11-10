import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    //endpoint trae users
    @Get()
    getAllUsers() {
        return this.userService.findAll();
    }

    //trae por ID
    @Get(':id')
    getUserById(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    //me trae las ordenes de compra de un User
    @Get(':id')
    getOrders(@Param('id') id: string) {
        return "orders";
    }
    
    //crea user
    @Post()
    create(@Body() payload: any) {
        return this.userService.create(payload);
    }

    //actualizo
    @Put(':id')
    update(@Param('id') id: string, @Body() payload: any) {
        return "actualizado";
    }

    //delete
    @Delete(':id')
    remove(@Param('id') id: string) {
        return "eliminado";
    }
}
