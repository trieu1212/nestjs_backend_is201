import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1711955107941 implements MigrationInterface {
    name = 'CreateUserTable1711955107941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`refreshToken\` varchar(255) NULL, \`avatar\` varchar(255) NULL, \`status\` int NOT NULL DEFAULT '1', \`isAdmin\` int NOT NULL DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
