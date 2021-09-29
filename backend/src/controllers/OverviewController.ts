import { Request, Response } from "express";
import { ActivitiesService } from "../services/ActivityServices";
import { ModulesService } from "../services/ModuloServices";
import { RoomsService } from "../services/RoomServices";
import { UsersRoomService } from "../services/UsersRoomServices";
import { UsersService } from "../services/UsersServices";

class OverviewController {
  async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.body.user;

    const roomServices = new RoomsService();
    const moduleService = new ModulesService();
    const activityService = new ActivitiesService();
    const userService = new UsersService();

    const totalRoomsUser = await roomServices.getTotalRoomsUser(id);
    const totalModulesUser = await moduleService.getTotalModulesUser(id);
    const totalActivitiesUser =
      await activityService.getTotalActivitiesTeacher();
    const totalStudents = await userService.getTotalStudents();

    return res.json({
      totalRoomsUser,
      totalModulesUser,
      totalActivitiesUser,
      totalStudents,
    });
  }

  async indexStudent(req: Request, res: Response): Promise<Response> {
    const { id } = req.body.user;

    const roomServices = new UsersRoomService();
    const activityService = new ActivitiesService();

    const totalRoomsUser = await roomServices.getTotalRoomsUser(id);
    const totalActivitiesUser = await activityService.getTotalActivitiesUser(
      id
    );

    return res.json({
      totalRoomsUser,
      totalActivitiesUser,
    });
  }

  async usersAndModules(req: Request, res: Response): Promise<Response> {
    const { id } = req.body.user;

    const moduleService = new ModulesService();
    const userService = new UsersService();

    const modulesUser = await moduleService.getModuleUser(id);
    const students = await userService.getStudents();

    return res.json({
      modulesUser,
      students,
    });
  }
}

export { OverviewController };
