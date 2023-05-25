import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongoDbModule } from 'src/database/database.module';
import { usersProviders } from './user.provider';
@Module({
    imports: [MongoDbModule],
    controllers: [UserController],
    providers: [UserService,...usersProviders]
})
export class UserModule { }
