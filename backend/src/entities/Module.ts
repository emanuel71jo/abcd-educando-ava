import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Activity } from "./Activity";
import { Room } from "./Room";


@Entity("modules")
class Module {
  @PrimaryColumn()
  id: string;

  @Column()
  content: string;

  @Column()
  evaluation: string;
  
  @JoinColumn({ name: "roomId" })
  @ManyToOne(() => Room, room => room.module)
  room: Room;

  @OneToMany(() => Activity, activity => activity.module, {cascade: true})
  activities: Activity[];

  constructor() {
    if (!this.id) this.id = uuid();
  }

  
}

export { Module };

