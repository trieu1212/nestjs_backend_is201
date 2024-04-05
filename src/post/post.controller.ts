import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { PostService } from './post.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FilterPostDto } from './dto/filter-post.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
    // eslint-disable-next-line prettier/prettier
    constructor(private postService: PostService){}
    @UseGuards(AuthGuard)
    @Post('/create')
    create(@Req() req:any, @Body() createPostDto:CreatePostDto):Promise<PostEntity>{
        return this.postService.create(req.user.id,createPostDto);
        console.log(req.user.id);
        console.log(createPostDto);
    }

    @Get()
    findAll(@Query() query:FilterPostDto):Promise<PostEntity[]>{
        return this.postService.findAll(query);
    }

    @Get('/:id')
    findOne(@Param('id') id:string):Promise<PostEntity>{
        return this.postService.findOne(Number(id))
    }
}