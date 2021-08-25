import { Request, Response } from "express";
import { ModulesService } from "../services/ModuloServices";
import { RoomsService } from "../services/RoomServices";

class RoomsController {
    async index(req: Request, res: Response): Promise<Response> {
        const modulesService = new ModulesService();

        const modules = await modulesService.listAll();

        return res.json(modules);
    }

    async create(req: Request, res: Response): Promise<Response> {
        const { students, teacher, modules } = req.body;

        const roomsService = new RoomsService();

        const roomCreated = await roomsService.create(
            students,
            teacher,
            modules
        );

        return res.json(roomCreated);
    }
}

export { RoomsController };

