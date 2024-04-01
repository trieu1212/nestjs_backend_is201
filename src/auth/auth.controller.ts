import { AuthService } from './auth.service';
import { Body, Controller,Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController { 

    // eslint-disable-next-line prettier/prettier
    constructor ( private authService:AuthService ) {}
    @Post('register')
    register(@Body() registerUserDto:RegisterUserDto ):Promise<User>{
        console.log('register api');
        console.log(registerUserDto)
        return this.authService.register(registerUserDto)
    }

}
