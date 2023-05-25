import { Body, Controller, Post,UseGuards } from "@nestjs/common";
import { UseFilters } from "@nestjs/common/decorators";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { LoginDto } from "./dto/login.dto";
import {
    ApiCreatedResponse,
    ApiUnprocessableEntityResponse,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiNotFoundResponse
} from '@nestjs/swagger'
import { MongoExceptionFilter } from "src/database/mongoErrorFilter/mongo.errorFilter";
import { GetUser } from "./decorator";
import { Types } from "mongoose";
import { RefreshGuard } from "./guard";

@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    @UseFilters(MongoExceptionFilter)
    @ApiCreatedResponse({ description: 'Created Succesfully' })
    @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
    @ApiForbiddenResponse({ description: 'Unauthorized Request' })
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto)
    }

    @Post('login')
    @ApiOkResponse({ description: 'The resource was returned successfully' })
    @ApiNotFoundResponse({ description: 'the resource was not found' })
    @ApiForbiddenResponse({ description: 'Unauthorized Request' })
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto)
    }

    @UseGuards(RefreshGuard)
    @Post('refreshToken')
    refreshTokens(@GetUser('userId') userId: Types.ObjectId) {
        return this.authService.refreshTokens(userId)
    }


}