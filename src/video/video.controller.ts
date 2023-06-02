import { Controller, UseGuards, Post, Delete, Get, Put, Body, Param, UseFilters, Query } from '@nestjs/common'
import { GetUser } from 'src/auth/decorator';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { VideoService } from './video.service';
import { VideoDto } from './dto';
import { ParseObjectIdPipe } from 'src/database/pipes/parse-objectId.pipe';
import { MongoExceptionFilter } from 'src/database/mongoErrorFilter/mongo.errorFilter';
import { FilterQueryDto } from './dto/filterQuery.dto';

@UseGuards(JwtGuard)
@Controller("video")

export class VideoContoller {

    constructor(private videoService: VideoService) { }

    @Post('')
    @UseGuards(RolesGuard)
    @UseFilters(MongoExceptionFilter)
    createVideo(@GetUser('_id') userId: string, @Body() videoDto: VideoDto) {
        return this.videoService.createVideo(userId, videoDto)
    }

    @Get('find/:id')
    @UseGuards(RolesGuard)

    getVideo(@Param('id', new ParseObjectIdPipe()) id: string) {
        return this.videoService.getVideo(id)
    }

    @Get('')
    @UseGuards(RolesGuard)
    getAllVideos() {
        return this.videoService.getAllVideos()
    }

    @Put(':videoId')
    @UseGuards(RolesGuard)
    editVideo(@Param('videoId', new ParseObjectIdPipe()) videoId: string,
        @GetUser('_id') userId: string,
        @Body() videoDto: VideoDto
    ) {
        return this.videoService.editVideo(videoDto, videoId, userId)
    }

    @Put('like/:videoId')
    @UseGuards(RolesGuard)
    like(@Param('videoId', new ParseObjectIdPipe()) videoId: string, @GetUser('_id') userId: string) {
        return this.videoService.like(videoId, userId)
    }

    @Put('dislike/:videoId')
    @UseGuards(RolesGuard)
    dislike(@Param('videoId', new ParseObjectIdPipe()) videoId: string, @GetUser('_id') userId: string) {
        return this.videoService.dislike(videoId, userId)
    }

    @Delete(':videoId')
    @UseGuards(RolesGuard)
    delete(@Param('videoId', new ParseObjectIdPipe()) videoId: string, @GetUser('_id') userId: string) {
        return this.videoService.deleteVideo(videoId, userId)
    }

    @Get('filter')
    @UseGuards(RolesGuard)
    filterVideos(@Query() query:FilterQueryDto) {
        return this.videoService.filter(query)
    }




}

