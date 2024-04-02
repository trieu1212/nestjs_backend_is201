import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnCreatedAtUpdatedAtForAllTable1712023585394 implements MigrationInterface {
    name = 'AddColumnCreatedAtUpdatedAtForAllTable1712023585394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`service\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`service\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`updatedAt\` \`updatedAt\` datetime(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`createdAt\` \`createdAt\` datetime(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`service\` CHANGE \`updatedAt\` \`updatedAt\` datetime(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`service\` CHANGE \`createdAt\` \`createdAt\` datetime(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`createdAt\``);
    }

}
