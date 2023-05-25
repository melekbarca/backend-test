import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from '@nestjs/config';
import { AtStrategy, RtStrategy } from "./strategy";
import { usersProviders } from "src/user/user.provider";
import { MongoDbModule } from "src/database/database.module";

@Module({
    imports: [MongoDbModule,
    ConfigModule.forRoot({
        isGlobal:true
      }),
    JwtModule.register({
        global: true,
        // secret: process.env.SECRET_KEY,
        // signOptions: { expiresIn: '15m' },
      }),],
    controllers:[AuthController],
    providers:[AuthService,RtStrategy,AtStrategy,...usersProviders]
})
export class AuthModule { }