import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post as PostEntity } from './entities/post.entity';
import { Like, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Image } from 'src/image/entities/image.entity';
import { User } from 'src/user/entities/user.entity';
import { Service } from 'src/service/entities/service.entity';
import { FilterPostDto } from './dto/filter-post.dto';
import { UpdatePostDto } from 'src/post/dto/update-post.dto';
@Injectable()
export class PostService {
  constructor(
    // eslint-disable-next-line prettier/prettier
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(Image) private imageRepository: Repository<Image>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Service) private serviceRepository: Repository<Service>,
  ) {}
  async create(id: number, createPostDto: CreatePostDto): Promise<PostEntity> {
    const user = await this.userRepository.findOneBy({ id: id });
    const service = await this.serviceRepository.findOneBy({
      id: createPostDto.serviceId,
    });
    user.postAmount = user.postAmount - 1;
    await this.userRepository.save(user);
    const newPost = new PostEntity();
    newPost.name = createPostDto.name;
    newPost.description = createPostDto.description;
    newPost.status = false;
    newPost.roomType = createPostDto.roomType;
    newPost.price = createPostDto.price;
    newPost.address = createPostDto.address;
    newPost.arcreage = createPostDto.arcreage;
    newPost.user = user;
    newPost.service = service;
    const savedPost = await this.postRepository.save(newPost);
    const saveImagePromises = createPostDto.imageUrls.map(async (imageUrl) => {
      const image = new Image();
      image.imageUrl = imageUrl;
      image.post = savedPost;
      return await this.imageRepository.save(image);
    });

    await Promise.all(saveImagePromises);

    return savedPost;
  }
  async findAll(query: FilterPostDto): Promise<any> {
    const page = Number(query.page) || 1;
    const itemPerpage = Number(query.itemPerPage) || 10;
    const skip = (page - 1) * itemPerpage;
    const search = query.search || '';
    const roomType = query.roomType || '';
    const address = query.address || '';
    const [result, total] = await this.postRepository.findAndCount({
      where: [
        {
          name: Like(`%${search}%`),
          roomType: Like(`%${roomType}%`),
          address: Like(`%${address}%`),
          description: Like(`%${search}%`),
        },
      ],
      order: { 
        service: {
          id: 'ASC'
        },
        createdAt: 'DESC' ,
      },
      take: itemPerpage,
      skip: skip,
      relations: {
        user: true,
        service: true,
        images: true,
      },
      select: {
        user: {
          id: true,
          username: true,
          email: true,
          phone:true,
          avatar: true,
        },
        service: {
          id: true,
          name: true,
        },
        images: {
          id: true,
          imageUrl: true,
        },
      },
    });
    const lastPage = Math.ceil(total / itemPerpage);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;
    return {
      data: result,
      total,
      currentPage: page,
      nextPage,
      prevPage,
      lastPage,
    };
  }
  async findOne(id:number):Promise<PostEntity>{
    return this.postRepository.findOne({
      where:{
        id:id
      },
      relations:{
        user:true,
        service:true,
        images:true
      },
      select:{
        user:{
          id:true,
          username:true,
          email:true,
          phone:true,
          avatar:true
        },
        service:{
          id:true,
          name:true
        },
        images:{
          id:true,
          imageUrl:true
        }
      }
    })
  }
  async findAllByUser(id:number):Promise<PostEntity[]>{
    return this.postRepository.find({
      where:{
        user:{
          id:id
        }
      },
      relations:{
        user:true,
        service:true,
        images:true
      },
      select:{
        user:{
          id:true,
          username:true,
          email:true,
          phone:true,
          avatar:true
        },
        service:{
          id:true,
          name:true
        },
        images:{
          id:true,
          imageUrl:true
        }
      }
    })
  }
  async approvePost(id:number):Promise<PostEntity>{
    const post = await this.postRepository.findOne({
      where:{
        id:id
      }
    })
    post.status = true;
    return this.postRepository.save(post);
  }
  
  async hidePost(id:number):Promise<PostEntity>{
    const post = await this.postRepository.findOne({
      where:{
        id:id
      }
    })
    post.status = false;
    return this.postRepository.save(post);
  }

  async update(id:number,updatePostDto:UpdatePostDto):Promise<PostEntity>{
    const post = await this.postRepository.findOne({
      where: { id: id },
      relations: ['images', 'user', 'service'],
    });

    if (!post) {
      throw new Error('Post not found');
    }

    const service = await this.serviceRepository.findOneBy({
      id: updatePostDto.serviceId,
    });

    if (!service) {
      throw new Error('Service not found');
    }

    post.name = updatePostDto.name;
    post.description = updatePostDto.description;
    post.roomType = updatePostDto.roomType;
    post.price = updatePostDto.price;
    post.address = updatePostDto.address;
    post.arcreage = updatePostDto.arcreage;
    post.service = service;

    await this.postRepository.save(post);

    await this.imageRepository.delete({ post: { id: post.id } });

    const saveImagePromises = updatePostDto.imageUrls.map(async (imageUrl) => {
      const image = new Image();
      image.imageUrl = imageUrl;
      image.post = post;
      return await this.imageRepository.save(image);
    });

    await Promise.all(saveImagePromises);

    return post;
  }
}
