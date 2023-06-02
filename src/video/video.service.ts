import { Injectable, Inject, NotFoundException, ForbiddenException, InternalServerErrorException } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { Video_Model } from "src/config";
import { Video } from "./video.model";
import { VideoDto } from "./dto";
import { FilterQueryDto } from "./dto/filterQuery.dto";
import { log } from "console";


@Injectable({})
export class VideoService {
    constructor(
        @Inject(Video_Model)
        private videoModel: Model<Video>
    ) { }
    async createVideo(userId: string, videoDto: VideoDto): Promise<Video> {
        const video = await this.videoModel.create({
            userId: userId,
            ...videoDto
        })
        return video
    }

    async getVideo(id: string): Promise<Video> {
        const video = await this.videoModel.findOne({ _id: id })
        if (!video)
            throw new NotFoundException()

        return video


    }

    async getAllVideos(): Promise<Video[]> {

        const videos = await this.videoModel.find()
        return videos

    }

    async like(videoId: string, userId: string): Promise<Video> {

        const video = await this.videoModel.findOneAndUpdate(
            { _id: videoId },
            {
                $addToSet: { likes: userId },
                $inc: { likesCounter: 1 },
            },
            { new: true })

        return video


    }
    async dislike(videoId: string, userId: string): Promise<Video> {

        const video = await this.videoModel.findOneAndUpdate(
            { _id: videoId },
            {
                $pull: { likes: userId },
                $inc: { likesCounter: -1 },
            },
            { new: true })

        return video


    }

    async editVideo(videoDto: VideoDto, videoId: string, userId: string): Promise<Video> {

        const video = await this.videoModel.findById(videoId)
        if (!video || video.userId.toString() !== userId.toString())
            throw new ForbiddenException("Access to ressources denied")

        const editedVideo = await this.videoModel.findOneAndUpdate(
            { _id: videoId },
            { ...videoDto },
            { new: true })

        return editedVideo
    }
    async deleteVideo(videoId: string, userId: string) {
        const video = await this.videoModel.findById(videoId)

        if (video.isDeleted === true || video.userId.toString() !== userId.toString())
            throw new ForbiddenException("Access to ressources denied")

        await this.videoModel.updateOne(
            { _id: videoId },
            { $set: { isDeleted: true } }
        )

        return {
            status: 200,
            message: "deleted"
        }
    }


    async filter(query: FilterQueryDto): Promise<[Video[],number]> {

        let filter: { [key: string]: string | string[] | undefined | any } = {}

        const { likes, likesCounter, thumbnail, limit, page } = query

        let pageNumber = parseInt(page) || 1;
        let pageSize = parseInt(limit) || 10;


        if (likes) filter.likes = { $in: typeof likes === 'string' ? new Types.ObjectId(likes) : likes.map(videoId => new Types.ObjectId(videoId)) }

        if (likesCounter) filter.likesCounter = { $gte: likesCounter }

        if (thumbnail) filter.thumbnail = thumbnail

        const skipItems = (pageNumber - 1) * pageSize

        const videos = await this.videoModel.find(filter).limit(pageSize).skip(skipItems)

        const totalDocuments = await this.videoModel.countDocuments(filter)

        let numberPages = Math.ceil(totalDocuments / 10)

        return [
            videos,
            numberPages
        ]


    }

}