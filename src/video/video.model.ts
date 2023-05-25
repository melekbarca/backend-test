
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/user.model';

export type VideoDocument = HydratedDocument<Video>;

@Schema()
export class Video {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true,unique:true })
    url: string;

    @Prop({ required: true })
    thumbnail: string;

    @Prop({ required: false, default: [] })
    likes: string[];

    @Prop({ required: false, default: 0 })
    likesCounter: number;

    @Prop({ required: true, ref: User.name })
    userId: mongoose.Schema.Types.ObjectId

    @Prop({ default: false })
    isDeleted: boolean

}

export const VideoSchema = SchemaFactory.createForClass(Video);