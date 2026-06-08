import {Controller, Post, Body,Get, Param,Put,Delete} from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController{
    constructor(private readonly userService:UsersService){}

    @Post()
    createUser(@Body('name') name:string,
    @Body('email') email:string,){
    return this.userService.createUser(name,email);
}
    @Get()
    getUsers(){
        
        return this.userService.getUsers();
    }
    @Get(":id")
    getById(@Param('id') id: string){
        return this.userService.getById(Number(id));
    }
    @Put(":id")
    updateUser(@Param("id") id:string,
    @Body("name") name:string,
    @Body("email") email:string){
        return this.userService.updateUser(Number(id),name,email);
    }
    @Delete(":id")
    deleteUser(@Param("id") id:string){
        return this.userService.deleteUser(Number(id));
    }

}
