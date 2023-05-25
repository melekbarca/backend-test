import { Injectable, NotFoundException, ForbiddenException, UnauthorizedException,Inject } from "@nestjs/common";
import { User } from "./user.model";
import { Model } from "mongoose";
import { UpdateUserDto } from "./dto";
import * as bcrypt from 'bcrypt'
import { User_Model } from "src/config";


@Injectable({})
export class UserService {
    constructor(
        @Inject(User_Model)
         private userModel: Model<User>,

    ) { }

    async updateUser(id: string, updateUserDto: UpdateUserDto):Promise<User> {

        const user = await this.userModel.findById(id)
        if (!user)
            throw new NotFoundException('user not found')

        const isMatch = await bcrypt.compare(updateUserDto.password, user.password)

        if (!isMatch)
            throw new ForbiddenException("credentials not valid")

        const newHashPassword = await bcrypt.hash(updateUserDto.newPassword, 8)
        delete updateUserDto.newPassword
        const updatedUser = await this.userModel.findOneAndUpdate(
            { _id: id },
            { ...updateUserDto, password: newHashPassword }
            ,
            { new: true })


        return updatedUser


    }
    async deleteUser(id: string, userId: string) {

            if (userId !== id) 
                 throw new UnauthorizedException('your are not allowed to do such action')
            
            const user = await this.userModel.findById(id)

            if (!user)
                throw new NotFoundException("user not found")

            await this.userModel.deleteOne({ _id: id })

            return {
                status: 200,
                message: "deleted successfully"
            }


    }


    async findAllUsers():Promise<User[]> {
        const users = await this.userModel.find()
        return users
    }

}