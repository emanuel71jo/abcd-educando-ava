import bcrypt from "bcryptjs";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Activity } from "./Activity";
import { Room } from "./Room";
import { UserRoom } from "./UserRoom";


@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  type: number;

  @Column()
  passwordHash: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Room, room => room.teacher, {cascade: true})
  room: Room;

  @JoinColumn({ name: "roomId" })
  @ManyToOne(() => Room, room => room.students)
  rooms: Room[];

  @OneToMany(() => Activity, activity => activity.user, {cascade: true})
  activities: Activity[];

  @OneToMany(() => UserRoom, userRoom => userRoom.user, {cascade: true})
  userRooms: UserRoom[];

  constructor() {
    if (!this.id) this.id = uuid();
  }

  hashPassword(password: string) {
    this.passwordHash = bcrypt.hashSync(password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.passwordHash);
  }
}

export { User };

