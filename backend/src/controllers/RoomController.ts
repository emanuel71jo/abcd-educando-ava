import { Request, Response } from "express";
import { ModulesService } from "../services/ModuloServices";
import { RoomsService } from "../services/RoomServices";
import { UsersRoomService } from "../services/UsersRoomServices";

class RoomsController {
  async index(req: Request, res: Response): Promise<Response> {
    const { userId } = req.body.user;

    const roomsService = new RoomsService();

    const rooms = await roomsService.findByTeacherId(userId);

    return res.json(rooms);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const {
      students,
      user: { userId },
    } = req.body;

    console.log("HERE 1");

    const roomsService = new RoomsService();

    console.log("HERE 2");

    const roomCreated = await roomsService.create(userId);

    console.log("HERE 3");

    const usersRoomService = new UsersRoomService();

    console.log("HERE 4");

    const usersRoom = await usersRoomService.createAll(students, roomCreated);

    console.log("HERE 5");

    roomCreated.userRooms = usersRoom;

    console.log("HERE 6");

    return res.json(roomCreated);
  }
}

export { RoomsController };
