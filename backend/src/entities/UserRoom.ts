import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Room } from "./Room";
import { User } from "./User";

@Entity("userRooms")
class UserRoom {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  roomId: string;

  @CreateDateColumn()
  created_at: Date;

  @JoinColumn({ name: "userId" })
  @ManyToOne(() => User, (user) => user.userRooms)
  user: User;

  @JoinColumn({ name: "roomId" })
  @ManyToOne(() => Room, (room) => room.userRooms)
  room: Room;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}

export { UserRoom };
