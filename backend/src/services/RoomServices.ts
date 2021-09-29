import { getCustomRepository, Repository } from "typeorm";
import { Module } from "../entities/Module";
import { Room } from "../entities/Room";
import { User } from "../entities/User";
import { RoomsRepository } from "../repositories/RoomRepository";
import { ModulesService } from "./ModuloServices";
import { UsersRoomService } from "./UsersRoomServices";
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
    const modulesServices = new ModulesService();
    const userRoomsService = new UsersRoomService();

    const rooms = await this.roomsRepository.find({ where: { teacherId } });

    const roomsResponse = rooms.map(async (room) => {
      const countModules = await modulesServices.getTotalModulesRoom(room.id);
      const countStudents = await userRoomsService.getTotalRoomsRoom(room.id);

      return {
        ...room,
        countModules,
        countStudents,
      };
    });

    return await Promise.all(roomsResponse);
  }

  async getTotalRoomsUser(teacherId: string): Promise<number> {
    const totalRoomsUser = await this.roomsRepository.count({
      where: { teacherId },
    });

    return totalRoomsUser;
  }

  async create(teacherId: string, title: string): Promise<Room> {
    const room = new Room();
    room.teacherId = teacherId;
    room.title = title;

    const roomCreated = this.roomsRepository.create(room);

    await this.roomsRepository.save(roomCreated);

    return room;
  }
}

export { RoomsService };
