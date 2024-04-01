import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query() query:FilterUserDto): Promise<User[]> {
    return this.userService.findAll(query);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  findOne(@Param('id') id:string):Promise<User>{
    return this.userService.findOne(Number(id))
  }

  @UseGuards(AuthGuard)
  @Post('/create')
  create(@Body() createUserDto:CreateUserDto):Promise<User>{
    return this.userService.create(createUserDto)
  }

  @UseGuards(AuthGuard)
  @Put('/update/:id')
  update(@Param('id') id:string, @Body() updateUserDto:UpdateUserDto){
    return this.userService.update(Number(id),updateUserDto)
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  delete(@Param('id') id:string){
    return this.userService.delete(Number(id))
  }
}