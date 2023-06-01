import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class  $npmConfigName1685603972679 {
    name = ' $npmConfigName1685603972679'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY NOT NULL,
                "Title" varchar NOT NULL,
                "Date" varchar NOT NULL,
                "Overview" varchar NOT NULL,
                "Poster_path" varchar NOT NULL,
                "Vote_average" integer NOT NULL,
                "Vote_count" integer NOT NULL,
                "Popularity" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"(
                    "id",
                    "Title",
                    "Date",
                    "Overview",
                    "Poster_path",
                    "Vote_average",
                    "Vote_count"
                )
            SELECT "id",
                "Title",
                "Date",
                "Overview",
                "Poster_path",
                "Vote_average",
                "Vote_count"
            FROM "movie"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie"
                RENAME TO "movie"
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME TO "temporary_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY NOT NULL,
                "Title" varchar NOT NULL,
                "Date" varchar NOT NULL,
                "Overview" varchar NOT NULL,
                "Poster_path" varchar NOT NULL,
                "Vote_average" integer NOT NULL,
                "Vote_count" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"(
                    "id",
                    "Title",
                    "Date",
                    "Overview",
                    "Poster_path",
                    "Vote_average",
                    "Vote_count"
                )
            SELECT "id",
                "Title",
                "Date",
                "Overview",
                "Poster_path",
                "Vote_average",
                "Vote_count"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
    }
}