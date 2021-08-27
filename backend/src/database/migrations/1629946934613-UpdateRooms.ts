import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class UpdateRooms1629946934613 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "rooms",
      new TableColumn({
        name: "teacherId",
        type: "uuid",
      })
    );
    await queryRunner.createForeignKey(
      "rooms",
      new TableForeignKey({
        name: "FKTeacher",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["teacherId"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("rooms", "FKTeacher");
    await queryRunner.dropColumn("rooms", "teacherId");
  }
}
