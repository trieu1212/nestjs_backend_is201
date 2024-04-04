import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { PostService } from './post.service';
import { AuthGuard } from 'src/auth/auth.guard';

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
}