import { IsNotEmpty,IsEmail,IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger/dist";
export class LoginDto {
    @ApiProperty({
        type: String,
        description: 'This is a required property',
         })
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @ApiProperty({
        type: String,
        description: 'This is a required property',
         })
    @IsNotEmpty()
    @IsString()
    password: string;

}