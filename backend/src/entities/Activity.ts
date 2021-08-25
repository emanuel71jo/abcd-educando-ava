import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "../entities/User";
import { Module } from "./Module";


@Entity("activities")
class Activity {
  @PrimaryColumn()
  id: string;

  @Column()
  nota: number;

  @JoinColumn({ name: "userId" })
  @ManyToOne(() => User, user => user.activities)
  user: User;

  @JoinColumn({ name: "moduleId" })
  @ManyToOne(() => Module, module => module.activities)
  module: Module;

  constructor() {
    if (!this.id) this.id = uuid();
  }

}

export { Activity };

