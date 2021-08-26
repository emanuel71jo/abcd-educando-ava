import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Activity } from "./Activity";
import { Room } from "./Room";
import { User } from "./User";

@Entity("modules")
class Module {
  @PrimaryColumn()
  id: string;

  @Column()
  content: string;

  @Column()
  evaluation: string;

  @Column()
  roomId: string;

  @Column()
  userId: string;

  @CreateDateColumn()
  created_at: Date;

  @JoinColumn({ name: "roomId" })
  @ManyToOne(() => Room, (room) => room.modules)
  room: Room;

  @JoinColumn({ name: "userId" })
  @ManyToOne(() => User, (user) => user.modules)
  user: User;

  @OneToMany(() => Activity, (activity) => activity.module, { cascade: true })
  activities: Activity[];

  constructor() {
    if (!this.id) this.id = uuid();
  }
}

export { Module };
