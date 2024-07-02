import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notify {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    message: string

    @Column()
    type: string

    @ManyToOne(() => User, (user) => user.notifications)
    user: User;

    @CreateDateColumn()
    createdAt: Date;
  
    @CreateDateColumn()
    updatedAt: Date;
}