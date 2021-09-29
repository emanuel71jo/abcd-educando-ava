import { Router } from "express";
import { ActivitiesController } from "./controllers/ActivityController";
import { AuthController } from "./controllers/AuthController";
import { ModulesController } from "./controllers/ModuleController";
import { OverviewController } from "./controllers/OverviewController";
import { RoomsController } from "./controllers/RoomController";
import { UsersController } from "./controllers/UsersController";
import { checkJwt } from "./middlewares/checkJwtMiddleware";

const usersController = new UsersController();
const authController = new AuthController();
const activitiesController = new ActivitiesController();
const roomsController = new RoomsController();
const overviewController = new OverviewController();
const moduleController = new ModulesController();

const routes = Router();

routes.post("/signIn", authController.signIn);

routes.post("/users", usersController.create);

routes.use(checkJwt);

routes.route("/users").get(usersController.index);

routes
  .route("/activities")
  .get(activitiesController.index)
  .post(activitiesController.create);

routes.route("/rooms").get(roomsController.index).post(roomsController.create);
routes.route("/rooms/student").get(roomsController.indexStudent);

routes
  .route("/module")
  .post(moduleController.create)
  .get(moduleController.index);

routes.route("/overview").get(overviewController.index);
routes.route("/overview/student").get(overviewController.indexStudent);
routes.route("/createRoom").get(overviewController.usersAndModules);

routes.route("/students").get(usersController.listAllStudents);

export { routes };
