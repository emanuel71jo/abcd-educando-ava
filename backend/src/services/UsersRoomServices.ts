import { getCustomRepository, Repository } from "typeorm";
import { Room } from "../entities/Room";
import { UserRoom } from "../entities/UserRoom";
import { UsersRoomRepository } from "../repositories/UsersRoomRepository";
import { UsersService } from "./UsersServices";

class UsersRoomService {
  private usersRoomRepository: Repository<UserRoom>;

  constructor() {
    this.usersRoomRepository = getCustomRepository(UsersRoomRepository);
  }

  async createAll(students: string[], room: Room): Promise<UserRoom[]> {
    const usersService = new UsersService();

    const promise = students.map(async (studentId) => {
      const userRoom = new UserRoom();
      userRoom.userId = studentId;
      userRoom.roomId = room.id;

      const userRoomCreated = this.usersRoomRepository.create(userRoom);

      return await this.usersRoomRepository.save(userRoomCreated);
    });

    return await Promise.all(promise);
  }
}

export { UsersRoomService };
