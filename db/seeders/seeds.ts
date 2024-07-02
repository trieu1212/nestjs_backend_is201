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

    let user = await userRepository.findOne({
        where: { username: 'trieuprovip' }
    })
    // Tìm dịch vụ (service) có sẵn hoặc tạo mới nếu chưa tồn tại
    let service = await serviceRepository.findOne({ 
        where: { name: 'Cleaning Service' }
    });
    
    if (!service) {
        service = new Service();
        service.name = 'Cleaning Service';
        service.description = 'Professional cleaning services';
        service.dateTime = Date.now(); // Hoặc có thể gán bằng new Date().getTime() để lấy timestamp
        service.price = 100;
        service.postAmount = 0;
        service.status = true;
        service.createdAt = new Date();
        service.updatedAt = new Date();
    
        await serviceRepository.save(service);
    }

    // Tạo 20 bài đăng cho service đã có sẵn
    for (let i = 0; i < 20; i++) {
        const post = postRepository.create({
            name: `Post ${i + 65}`,
            description: `Description for Post ${i + 65}`,
            status: true,
            roomType: 'Apartment',
            price: 1200,
            address: '123 Main St, City Center',
            arcreage: 85,
            service: service,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Tạo Image mẫu và liên kết với Post
        const image1 = imageRepository.create({
            imageUrl: 'https://example.com/image1.jpg',
            post: post,
        });
        const image2 = imageRepository.create({
            imageUrl: 'https://example.com/image2.jpg',
            post: post,
        });

        post.images = [image1, image2];
        await postRepository.save(post);
        await imageRepository.save(image1);
        await imageRepository.save(image2);
    }

    // Cập nhật số lượng bài đăng của dịch vụ
    service.postAmount += 20;
    await serviceRepository.save(service);

    console.log('Seeding complete');
    await dataSource.destroy();
}

seed().catch(error => console.error('Error seeding data:', error));
