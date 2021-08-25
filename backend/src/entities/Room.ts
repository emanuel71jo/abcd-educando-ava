import { Column, Entity, OneToMany, PrimaryColumn, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Module } from "./Module";
import { User } from "./User";
import { UserRoom } from "./UserRoom";


@Entity("rooms")
class Room {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => User, user => user.room, {cascade: true})
  students: User[];

  @JoinColumn({ name: "teacherId" })
  @ManyToOne(() => User, user => user.rooms)
  teacher: User;

  @OneToMany(() => Module, module => module.room, {cascade: true})
  module: Module[];

  @OneToMany(() => UserRoom, userRoom => userRoom.room, {cascade: true})
  userRooms: UserRoom[];

  constructor() {
    if (!this.id) this.id = uuid();
  }
}

export { Room };

