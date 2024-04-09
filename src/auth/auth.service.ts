import { LoginUserDto } from './dto/login-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    // eslint-disable-next-line prettier/prettier
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }
  private async hashPassword(password: string): Promise<string> {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
  async register(registerUserDto: RegisterUserDto): Promise<User> {
    try {
        const hashPassword = await this.hashPassword(registerUserDto.password);
        await this.userRepository.save({
          ...registerUserDto,
          status: 1,
          refreshToken: 'refreshToken_string',
          password: hashPassword,
        });
        throw new HttpException('Đăng kí thành công', HttpStatus.CREATED)
      }
     catch (error) {
      throw error
    }
  }
  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { username: loginUserDto.username },
    });
    if (!user) {
      throw new HttpException('Không tìm thấy User', HttpStatus.UNAUTHORIZED);
    }
    const checkPass = bcrypt.compareSync(loginUserDto.password, user.password);
    if (!checkPass) {
      throw new HttpException('Sai mật khẩu', HttpStatus.UNAUTHORIZED);
    }
    const payload = { id: user.id, isAdmin: user.isAdmin };
    const JWTToken = await this.generateJWTToken(payload)
    console.log(JWTToken)
    return {JWTToken,user};
  }
  private async generateJWTToken(payload: { id: number; isAdmin: number }) {
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('SECRET_REFRESH'),
      expiresIn: this.configService.get<string>('EXPRIES_IN_REFRESH'),
    });
    await this.userRepository.update(
      { id: payload.id },
      { refreshToken: refreshToken },
    );
    return { accessToken, refreshToken };
  }
  async refreshToken(refreshToken: string): Promise<any> {
    try {
      const verify = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('SECRET_REFRESH'),
      });
      const checkToken = await this.userRepository.findOneBy({
        id: verify.id,
        refreshToken: refreshToken,
      });
      if (checkToken) {
        return this.generateJWTToken({
          id: verify.id,
          isAdmin: verify.isAdmin,
        });
      } else {
        throw new HttpException('Token không hợp lệ', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException('Token không hợp lệ', HttpStatus.BAD_REQUEST);
    }
  }
  async logout(accessToken: string): Promise<any> {
    try {
      const verify = await this.jwtService.verifyAsync(accessToken, {
        secret: this.configService.get<string>('SECRET_ACCESS'),
      });
      if (verify) {
        await this.userRepository.update(
          { id: verify.id },
          { refreshToken: 'refreshToken_string' }
        )
        throw new HttpException('Đăng xuất thành công', HttpStatus.OK);
      } else {
        throw new HttpException('Token không hợp lệ', HttpStatus.BAD_REQUEST);
      }
    } catch (error) { }
  }
}
