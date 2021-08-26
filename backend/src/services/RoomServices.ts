import { getCustomRepository, Repository } from "typeorm";
import { Module } from "../entities/Module";
import { Room } from "../entities/Room";
import { User } from "../entities/User";
import { RoomsRepository } from "../repositories/RoomRepository";
import { UsersService } from "./UsersServices";

class RoomsService {
  private roomsRepository: Repository<Room>;

  constructor() {
    this.roomsRepository = getCustomRepository(RoomsRepository);
  }

  async listAll(): Promise<Room[]> {
    const rooms = await this.roomsRepository.find();
    return rooms;
  }

  async findById(roomId: string): Promise<Room> {
    const room = await this.roomsRepository.findOne({ where: { id: roomId } });
    return room;
  }

  async findByTeacherId(teacherId: string): Promise<Room[]> {
    const rooms = await this.roomsRepository.find({ where: { teacherId } });

    return rooms;
  }

  async create(teacherId: string): Promise<Room> {
    const room = new Room();
    room.teacherId = teacherId;

    const roomCreated = this.roomsRepository.create(room);

    await this.roomsRepository.save(roomCreated);

    return room;
  }
}

export { RoomsService };
