import { ArgumentsHost, Catch,ExceptionFilter,} from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
    catch(exception: MongoError, host: ArgumentsHost) {
        switch (exception.code) {
            case 11000:
                const response = host.switchToHttp().getResponse();
                response.status(409).json({
                    status:409,
                    message:"credentials taken"
                });
        }
    }
}
@Catch()
export class BadRequestFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    response.status(400).json({message: exception.message});
  }
}