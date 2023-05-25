import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { User_Model } from "src/config";
import { User } from "src/user/user.model";
import { AuthPayload} from "../types";


@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {

  constructor(
    @Inject(User_Model) private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.AT_SECRET,
    });
  }

  async validate(payload:AuthPayload) {
    const user = await this.userModel.findOne({ _id: payload.userId })
    return user;
  }
}