import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-http-bearer";
import { AuthService } from "./auth.service";

@Injectable()
export default class TokenStrategy extends PassportStrategy(Strategy) {
    constructor(private autService : AuthService) {
        super()
    }
    
    async validate(token : string) {
        const user = this.autService.findUserByToken(token);
        if(user == null) {
            throw new UnauthorizedException()
        }
        return user;
    }

}