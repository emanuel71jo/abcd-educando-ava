import { Request, Response } from "express";
import { ModulesService } from "../services/ModuloServices";

class ModulesController {
  async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.body.user;

    const modulesService = new ModulesService();

    const modules = await modulesService.findByUserId(id);

    return res.json(modules);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const {
      content,
      evaluation,
      user: { id },
    } = req.body;

    const modulesService = new ModulesService();

    const moduleCreated = await modulesService.create(content, evaluation, id);

    return res.json(moduleCreated);
  }
}

export { ModulesController };
