import { getCustomRepository, Repository } from "typeorm";
import { Module } from "../entities/Module";
import { Room } from "../entities/Room";
import { User } from "../entities/User";
import { RoomsRepository } from "../repositories/RoomRepository";

class RoomsService {
  private roomsRepository: Repository<Room>;

  constructor() {
    this.roomsRepository = getCustomRepository(RoomsRepository);
  }

  async listAll(): Promise<Room[]> {
    const rooms = await this.roomsRepository.find();
    return rooms;
  }

  async create(
    students: User[],
    teacher: User,
    modules: Module[]
  ): Promise<Room> {

    const room = new Room();
    room.students = students;
    room.teacher = teacher;
    room.modules = modules;

    const roomCreated = this.roomsRepository.create(room);

    await this.roomsRepository.save(roomCreated);

    return room;
  }

}

export { RoomsService };

