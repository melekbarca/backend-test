import { ForbiddenException, Injectable, NotFoundException, Inject } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { User } from "src/user/user.model";
import { AuthDto } from "./dto";
import * as bcrypt from "bcrypt"
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt/dist";
import { User_Model } from "src/config";
import { AuthPayload, Tokens } from "./types";
@Injectable({})
export class AuthService {
    constructor(
        @Inject(User_Model) private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async signup(dto: AuthDto): Promise<User> {

        const hashPassword = await bcrypt.hash(dto.password, 8)
        const newUser = new this.userModel({ ...dto, password: hashPassword })
        const user = await this.userModel.create(newUser)
        return user

    }

    async login(dto: LoginDto): Promise<Tokens> {
        const user = await this.userModel.findOne({ email: dto.email })
        if (!user)
            throw new NotFoundException("User not found")

        const isMatch = await bcrypt.compare(dto.password, user.password)

        if (!isMatch)
            throw new ForbiddenException("credentials not valid")

        const payload = { userId: user._id }
        return this.generateTokens(payload)
    }

    async refreshTokens(userId: Types.ObjectId) {
        const user = this.userModel.findOne({ _id: userId })
        if (!user)
            throw new ForbiddenException("Access denied")

        const tokens = await this.generateTokens({ userId, })

        return tokens
    }

    async generateTokens(payload: AuthPayload): Promise<Tokens> {

        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret:process.env.AT_SECRET,
                expiresIn: "15m"
            }),
            this.jwtService.signAsync(payload, {
                secret:process.env.RT_SECRET,
                expiresIn: "7d"
            }),
        ])
        return {
            accessToken: at,
            refreshToken: rt
        }
    }
}