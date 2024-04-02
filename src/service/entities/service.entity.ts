import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  dateTime: number;

  @Column()
  price: number;

  @Column()
  postAmount: number;

  @Column({ default: false })
  status: boolean;

  @OneToMany(() => User, (user) => user.service)
  users: User[];

  @OneToMany(() => Post, (post) => post.service)
  posts: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
