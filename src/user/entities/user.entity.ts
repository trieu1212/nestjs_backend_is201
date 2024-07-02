
import { Notify } from 'src/notify/entities/notify.entity';
import { Order } from 'src/order/entities/order.entity';
import { Post } from 'src/post/entities/post.entity';
import { Service } from 'src/service/entities/service.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column({unique:true})
  username: string;

  @Column({unique:true})
  email: string;

  @Column({ nullable: true, default: null })
  phone: string;

  @Column()
  password: string;

  @Column({ nullable: true, default: null })
  refreshToken: string;

  @Column({ nullable: true, default: null })
  avatar: string;

  @Column({ default: 1 })
  status: number;

  @Column({ default: 0 })
  isAdmin: number;

  @Column({ default: 0 })
  postAmount: number;

  @ManyToOne(() => Service, (service) => service.users)
  service: Service;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Notify, (notify) => notify.user)
  notifications: Notify[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
