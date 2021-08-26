import { Request, Response } from "express";
import { ActivitiesService } from "../services/ActivityServices";

class ActivitiesController {
  async index(req: Request, res: Response): Promise<Response> {
    const { userId } = req.body.user;

    const activitiesService = new ActivitiesService();

    const activities = await activitiesService.findByUserId(userId);

    return res.json(activities);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const {
      nota,
      moduleId,
      user: { userId },
    } = req.body;

    const activitiesService = new ActivitiesService();

    const activityCreated = await activitiesService.create(
      nota,
      userId,
      moduleId
    );

    return res.json(activityCreated);
  }
}

export { ActivitiesController };
