import { Injectable,ForbiddenException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthPayload, AuthPayloadWithRt} from "../types";
import { Request } from "express";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey:process.env.RT_SECRET ,
          passReqToCallback: true,
        });
      }
    
      validate(req: Request, payload: AuthPayload):AuthPayloadWithRt  {
        const refreshToken = req
          ?.get('authorization')
          ?.replace('Bearer', '')
          .trim();
    
        if (!refreshToken) throw new ForbiddenException('Refresh token malformed');
    
        return {
          ...payload,
          refreshToken,
        };
      }
}