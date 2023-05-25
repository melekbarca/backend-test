import { AuthPayload } from "./authPayload.type";


export type AuthPayloadWithRt = AuthPayload & {refreshToken:string}