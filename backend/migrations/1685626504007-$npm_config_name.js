import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class  $npmConfigName1685626504007 {
    name = ' $npmConfigName1685626504007'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "temporary_user_rating" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "movie_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                "rating" integer NOT NULL,
                "genre" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_user_rating"("id", "movie_id", "user_id", "rating")
            SELECT "id",
                "movie_id",
                "user_id",
                "rating"
            FROM "user_rating"
        `);
        await queryRunner.query(`
            DROP TABLE "user_rating"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_user_rating"
                RENAME TO "user_rating"
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user_rating"
                RENAME TO "temporary_user_rating"
        `);
        await queryRunner.query(`
            CREATE TABLE "user_rating" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "movie_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                "rating" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "user_rating"("id", "movie_id", "user_id", "rating")
            SELECT "id",
                "movie_id",
                "user_id",
                "rating"
            FROM "temporary_user_rating"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_user_rating"
        `);
    }
}
