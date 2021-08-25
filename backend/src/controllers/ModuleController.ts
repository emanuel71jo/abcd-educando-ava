import { Request, Response } from "express";
import { ModulesService } from "../services/ModuloServices";

class ModulesController {
    async index(req: Request, res: Response): Promise<Response> {
        const modulesService = new ModulesService();

        const modules = await modulesService.listAll();

        return res.json(modules);
    }

    async create(req: Request, res: Response): Promise<Response> {
        const { content, evaluation, room, activities } = req.body;

        const modulesService = new ModulesService();

        const moduleCreated = await modulesService.create(
            content,
            evaluation,
            room,
            activities
        );

        return res.json(moduleCreated);
    }
}

export { ModulesController };

