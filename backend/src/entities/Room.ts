import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Module } from "./Module";
import { User } from "./User";
import { UserRoom } from "./UserRoom";

@Entity("rooms")
class Room {
  @PrimaryColumn()
  id: string;

  @Column()
  teacherId: string;

  @CreateDateColumn()
  created_at: Date;

  @JoinColumn({ name: "teacherId" })
  @ManyToOne(() => User, (user) => user.rooms, { cascade: true })
  teacher: User;

  @OneToMany(() => Module, (module) => module.room)
  modules: Module[];

  @OneToMany(() => UserRoom, (userRoom) => userRoom.room)
  userRooms: UserRoom[];

  constructor() {
    if (!this.id) this.id = uuid();
  }
}

export { Room };
