// import {
//     CanActivate,
//     ExecutionContext,
//     Injectable,
//     UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';
// import { InjectModel } from '@nestjs/mongoose'
// import { User } from 'src/user/user.model';
// import { Model } from 'mongoose';
// @Injectable()
// export class AuthGuard implements CanActivate {
//     constructor(
//         private jwtService: JwtService,
//         @InjectModel(User.name) private userModel: Model<User>
//     ) { }

//     async canActivate(context: ExecutionContext): Promise<boolean> {
//         const request = context.switchToHttp().getRequest();
//         const token = this.extractTokenFromHeader(request);

//         if (!token) {
//             throw new UnauthorizedException();
//         }
//         try {

//             const payload = await this.jwtService.verifyAsync(
//                 token,
//                 {
//                     secret: process.env.SECRET_KEY
//                 }
//             );

//             const user = await this.userModel.findById(payload.userId)


//             request['user'] = user;
//         } catch {
            
//             throw new UnauthorizedException();
//         }
//         return true;
//     }

//     private extractTokenFromHeader(request: Request): string | undefined {
//         const [type, token] = request.headers.authorization?.split(' ') ?? [];
//         return type === 'Bearer' ? token : undefined;
//     }
// }

import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}