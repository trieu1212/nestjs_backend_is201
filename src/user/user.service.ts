import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as  bcrypt  from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async findAll(query:FilterUserDto): Promise<any> {
    const itemPerPage = Number(query.itemPerPage) || 10
    const page = Number(query.page) || 1
    const skip = (page-1)*itemPerPage;
    const search = query.search || ''
    const [result,total] = await this.userRepository.findAndCount({
      where:[
        {username:Like('%'+search+'%')},
        {email:Like('%'+search+'%')},
      ],
      order: { createdAt: 'DESC' },
      take: itemPerPage,
      skip: skip,
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
    const lastPage = Math.ceil(total/itemPerPage)
    const nextPage = page+1>lastPage?null:page+1
    const prevPage = page-1<1?null:page-1
    return {
      data:result,
      total,
      currentPage:page,
      nextPage,
      prevPage,
      lastPage
    }
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