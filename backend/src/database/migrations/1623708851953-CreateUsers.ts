import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1623708851953 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "type",
            type: "number",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "passwordHash",
            type: "varchar",
          },
          {
            name: "firstName",
            type: "varchar",
          },
          {
            name: "lastName",
            type: "varchar",
          },
          {
            name: "roomId",
            type: "uuid",
            isNullable: true
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
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
