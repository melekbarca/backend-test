import { MongoClient, Db, } from 'mongodb';
import mongoose from 'mongoose';
import { database_connexion } from 'src/config';

export const mongoDbProviders = [
    {
      provide: database_connexion,
      useFactory: (): Promise<typeof mongoose> =>
        mongoose.connect(process.env.DB_URL),
    },
  ];