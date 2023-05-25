import { Module } from '@nestjs/common';
import { MongoDbModule } from 'src/database/database.module';
import { videosProviders } from './video.provider';
import { VideoContoller } from './video.controller';
import { VideoService } from './video.service';
@Module({
    imports: [MongoDbModule],
    controllers: [VideoContoller],
    providers: [VideoService,...videosProviders]
})
export class VideoModule { }
