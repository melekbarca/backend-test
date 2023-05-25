import { Module } from "@nestjs/common";
import { mongoDbProviders } from "./database.service";


@Module({
  providers: [...mongoDbProviders],
  exports: [...mongoDbProviders],
})
export class MongoDbModule {}