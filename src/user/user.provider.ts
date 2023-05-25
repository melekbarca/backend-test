import { Connection } from 'mongoose';
import { UserSchema, User } from './user.model';
import { User_Model, database_connexion } from 'src/config';

export const usersProviders = [
    {
        provide: User_Model,
        useFactory: (connection: Connection) => connection.model(User.name, UserSchema),
        inject: [database_connexion],
    },
];