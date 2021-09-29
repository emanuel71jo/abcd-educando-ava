import { Request, Response } from "express";
import { ModulesService } from "../services/ModuloServices";
import { RoomsService } from "../services/RoomServices";
import { UsersRoomService } from "../services/UsersRoomServices";

class RoomsController {
  async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.body.user;

    const roomsService = new RoomsService();

    const rooms = await roomsService.findByTeacherId(id);

    return res.json(rooms);
  }

  async indexStudent(req: Request, res: Response): Promise<Response> {
    const { id } = req.body.user;

    const roomsService = new UsersRoomService();

    const rooms = await roomsService.findByUserId(id);

    return res.json(rooms);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const {
      students,
      modules,
      title,
      user: { id },
    } = req.body;

    const roomsService = new RoomsService();
    const usersRoomService = new UsersRoomService();
    const moduleService = new ModulesService();

    const roomCreated = await roomsService.create(id, title);
    const usersRoom = await usersRoomService.createAll(students, roomCreated);
    await moduleService.updateRoomId(modules, roomCreated.id);

    roomCreated.userRooms = usersRoom;

    return res.json(roomCreated);
  }
}

export { RoomsController };
