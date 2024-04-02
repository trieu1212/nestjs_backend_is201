import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateImageTable1712040427411 implements MigrationInterface {
    name = 'CreateImageTable1712040427411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`imageUrl\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`postId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`serviceId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`serviceId\` \`serviceId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD UNIQUE INDEX \`IDX_caabe91507b3379c7ba73637b8\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`serviceId\` \`serviceId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD UNIQUE INDEX \`IDX_c721e93645fdc15f040096d1ea\` (\`serviceId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_caabe91507b3379c7ba73637b8\` ON \`order\` (\`userId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_c721e93645fdc15f040096d1ea\` ON \`order\` (\`serviceId\`)`);
        await queryRunner.query(`ALTER TABLE \`image\` ADD CONSTRAINT \`FK_72da7f42d43f0be3b3ef35692a0\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_5c1cf55c308037b5aca1038a131\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_0b77e7f8a9592478b5533e1b0b9\` FOREIGN KEY (\`serviceId\`) REFERENCES \`service\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_4c9b9b7a77b01d39fbe8238b774\` FOREIGN KEY (\`serviceId\`) REFERENCES \`service\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_c721e93645fdc15f040096d1eaa\` FOREIGN KEY (\`serviceId\`) REFERENCES \`service\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_c721e93645fdc15f040096d1eaa\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_4c9b9b7a77b01d39fbe8238b774\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_0b77e7f8a9592478b5533e1b0b9\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_5c1cf55c308037b5aca1038a131\``);
        await queryRunner.query(`ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_72da7f42d43f0be3b3ef35692a0\``);
        await queryRunner.query(`DROP INDEX \`REL_c721e93645fdc15f040096d1ea\` ON \`order\``);
        await queryRunner.query(`DROP INDEX \`REL_caabe91507b3379c7ba73637b8\` ON \`order\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP INDEX \`IDX_c721e93645fdc15f040096d1ea\``);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`serviceId\` \`serviceId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` DROP INDEX \`IDX_caabe91507b3379c7ba73637b8\``);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`userId\` \`userId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`serviceId\` \`serviceId\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`userId\` \`userId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`serviceId\``);
        await queryRunner.query(`DROP TABLE \`image\``);
    }

}
