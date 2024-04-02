import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
@Injectable()
export class AdminGuard implements CanActivate {
    // eslint-disable-next-line prettier/prettier
    constructor(private jwtService:JwtService, private configService:ConfigService){}
    async canActivate(context:ExecutionContext):Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const accessToken = this.getAccessTokenFromHeaders(request)
        if(!accessToken){
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(accessToken,{
                secret : this.configService.get<string>('SECRET_ACCESS')
            })
            if(payload.isAdmin!==1){
                throw new UnauthorizedException();
            }
            request['user'] = payload;
        } catch (error) {
            throw new UnauthorizedException()
        }
        return true;
    }

    private getAccessTokenFromHeaders (request:Request):string|undefined {
        const [type, accessToken] = request.headers.authorization ? request.headers.authorization.split(' ') : [];
        return type === 'Bearer' ? accessToken : undefined
    }
}