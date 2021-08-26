import { Request, Response } from "express";
import { ModulesService } from "../services/ModuloServices";

class ModulesController {
  async index(req: Request, res: Response): Promise<Response> {
    const { userId } = req.body.user;

    const modulesService = new ModulesService();

    const modules = await modulesService.findByUserId(userId);

    return res.json(modules);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const {
      content,
      evaluation,
      user: { userId },
      roomId,
    } = req.body;

    const modulesService = new ModulesService();

    const moduleCreated = await modulesService.create(
      content,
      evaluation,
      roomId,
      userId
    );

    return res.json(moduleCreated);
  }
}

export { ModulesController };
