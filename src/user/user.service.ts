import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as  bcrypt  from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      select: [
        'id',
        'username',
        'email',
        'avatar',
        'isAdmin',
        'serviceId',
        'status',
        'createdAt',
        'updatedAt',
      ],
    });
    return users;
  }
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: id });
    return user;
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashPass = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.save({...createUserDto,password:hashPass});
    return user;
  }
  async update(id:number,updateUserDto:UpdateUserDto):Promise<UpdateResult>{
    if(updateUserDto.password){
        const hashPass = await bcrypt.hash(updateUserDto.password,10)
        updateUserDto.password = hashPass
        return await this.userRepository.update(id,updateUserDto)
    }
    else{
        return await this.userRepository.update(id,updateUserDto)
    }
  }
  async delete(id:number):Promise<DeleteResult>{
    return await this.userRepository.delete(id)
  }
}