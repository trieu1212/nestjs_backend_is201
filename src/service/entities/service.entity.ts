import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
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

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
