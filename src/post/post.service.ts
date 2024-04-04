import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post as PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Image } from 'src/image/entities/image.entity';
import { User } from 'src/user/entities/user.entity';
import { Service } from 'src/service/entities/service.entity';
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
    newPost.status = true;
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
}
