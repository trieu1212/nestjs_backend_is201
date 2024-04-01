import { AuthService } from './auth.service';
import { Headers ,Body, Controller,Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from 'src/user/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController { 

    // eslint-disable-next-line prettier/prettier
    constructor ( private authService:AuthService ) {}
    @Post('register')
    register(@Body() registerUserDto:RegisterUserDto ):Promise<User>{
        // console.log('register api');
        console.log(registerUserDto)
        return this.authService.register(registerUserDto)
    }
    @Post('login')
    @UsePipes(ValidationPipe)
    login(@Body() loginUserDto:LoginUserDto):Promise<any>{
        // console.log('login api');
        console.log(loginUserDto);
        return this.authService.login(loginUserDto)
    }
    @Post('refresh-token')
    refreshToken(@Body() {refreshToken}):Promise<any>{
        // console.log('refresh token api');
        console.log(refreshToken);
        return this.authService.refreshToken(refreshToken)
    }

    @Post('logout')
    logout(@Headers('authorization') authHeader:string ):Promise<any>{
        if(authHeader){
            const accessToken = authHeader.split(' ')[1];
            console.log(accessToken);
            return this.authService.logout(accessToken)
        }
    }
}
