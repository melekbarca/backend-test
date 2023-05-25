import { Connection } from "mongoose";
import { Video_Model, database_connexion } from "src/config";
import { Video, VideoSchema } from "./video.model";

export const videosProviders = [
    {
        provide: Video_Model,
        useFactory: (connection: Connection) => connection.model(Video.name, VideoSchema),
        inject: [database_connexion],
    },
];