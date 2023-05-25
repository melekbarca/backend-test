import { Body, Controller, Get, Put, Request, UseGuards, Delete,Param } from "@nestjs/common";
import { JwtGuard, RolesGuard } from "src/auth/guard";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto";
import { GetUser, Roles } from "src/auth/decorator";
import { User } from "./user.model";



@UseGuards(JwtGuard)
@Controller("users")
export class UserController {
    constructor(private userService: UserService) { }

    @Get('find')
    @Roles('Admin')
    @UseGuards(RolesGuard)
    getUser(@GetUser() user:User) {
        return user
    }

    @Put(':id')
    updateUser(@Param('id') id: string,@Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(id,updateUserDto)
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string, @GetUser('_id') userId:string) {
       return this.userService.deleteUser(id,userId)
    }

    @Get('find/all')
    findAllUsers() {
        return this.userService.findAllUsers()
    }

}