import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateModule1629860088881 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "modules",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "content",
                        type: "varchar",
                    },
                    {
                        name: "evaluation",
                        type: "varchar",
                    },
                    {
                        name: "roomId",
                        type: "uuid",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ], foreignKeys: [
                    {
                        name: "FKRoom",
                        referencedTableName: "rooms",
                        referencedColumnNames: ["id"],
                        columnNames: ["roomId"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ]
            }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("modules");
    }

}
