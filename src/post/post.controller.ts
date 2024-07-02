import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
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
    }

    @Get()
    findAll(@Query() query:FilterPostDto):Promise<PostEntity[]>{
        return this.postService.findAll(query);
    }

    @Get('/:id')
    findOne(@Param('id') id:string):Promise<PostEntity>{
        return this.postService.findOne(Number(id))
    }

    @Get('/user/:id')
    findAllByUser(@Param('id') id:string):Promise<PostEntity[]>{
        return this.postService.findAllByUser(Number(id));
    }

    @Put('/approve/:id')
    approvePost(@Param('id') id:string):Promise<PostEntity>{
        return this.postService.approvePost(Number(id));
    }

    @Put('/hide/:id')
    hidePost(@Param('id') id:string):Promise<PostEntity>{
        return this.postService.hidePost(Number(id));
    }
}