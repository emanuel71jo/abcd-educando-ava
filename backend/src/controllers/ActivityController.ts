import { Request, Response } from "express";
import { ActivitiesService } from "../services/ActivityServices";

class ActivitiesController {
  async index(req: Request, res: Response): Promise<Response> {
    const activitiesService = new ActivitiesService();

    const activities = await activitiesService.findAll();

    return res.json(activities);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { nota, title = "", description = "", module, student } = req.body;

    const activitiesService = new ActivitiesService();

    const activityCreated = await activitiesService.create(
      nota,
      student,
      module,
      title,
      description
    );

    return res.json(activityCreated);
  }
}

export { ActivitiesController };
