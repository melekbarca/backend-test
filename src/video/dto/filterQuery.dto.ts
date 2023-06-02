
import { IsArray, IsNumber, IsOptional, IsString, } from "class-validator"
import { Types } from "mongoose"
export class FilterQueryDto {

    @IsOptional()
    @IsString()
    thumbnail: string

    @IsOptional()
    @IsNumber()
    likesCounter: number

    @IsOptional()
    likes: string[] |string

    @IsOptional()
    @IsNumber()
    page: string

    @IsOptional()
    @IsNumber()
    limit: string
}