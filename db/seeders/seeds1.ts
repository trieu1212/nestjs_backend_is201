import { DataSource } from 'typeorm';
import { Post } from '../../src/post/entities/post.entity';
import { Service } from '../../src/service/entities/service.entity';
import { Image } from '../../src/image/entities/image.entity';
import { User } from '../../src/user/entities/user.entity';

const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'is201',
    entities: [Service, Post, Image, User],
    synchronize: true,
});

async function seed() {
    await dataSource.initialize();
    const userRepository = dataSource.getRepository(User);
    const serviceRepository = dataSource.getRepository(Service);
    const postRepository = dataSource.getRepository(Post);
    const imageRepository = dataSource.getRepository(Image);

    let post = await postRepository.findOne({
        where: { id: 9 }
    })

    let image1 = imageRepository.create({
        imageUrl:"https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2023/01/27/z4064025740041-0c32a1d0197c20b63c64a57df8c64959_1674785592.jpg",
        post: post,
        createdAt: new Date(),
        updatedAt: new Date(),
    })

    let image2 = imageRepository.create({
        imageUrl:"https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2022/11/05/z3856577166368-dea106bf8442ee237840c00ec734c621_1667630805.jpg",
        post: post,
        createdAt: new Date(),
        updatedAt: new Date(),
    })

    let image3 = imageRepository.create({
        imageUrl:"https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2024/04/18/img-3034_1713413976.jpg",
        post: post,
        createdAt: new Date(),
        updatedAt: new Date(),
    })

    post.images = [image1, image2, image3]

    await postRepository.save(post);
    await imageRepository.save(image1);
    await imageRepository.save(image2);

    console.log('Seeding complete');
    await dataSource.destroy();
}

seed().catch(error => console.error('Error seeding data:', error));
