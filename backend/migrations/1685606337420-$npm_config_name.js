import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class  $npmConfigName1685606337420 {
    name = ' $npmConfigName1685606337420'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "user_rating" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "movie_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                "rating" integer NOT NULL
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "user_rating"
        `);
    }
}
