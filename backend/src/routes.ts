import { Router } from "express";
import { ActivitiesController } from "./controllers/ActivityController";
import { AuthController } from "./controllers/AuthController";
import { RoomsController } from "./controllers/RoomController";
import { UsersController } from "./controllers/UsersController";
import { checkJwt } from "./middlewares/checkJwtMiddleware";

const usersController = new UsersController();
const authController = new AuthController();
const activitiesController = new ActivitiesController();
const roomsController = new RoomsController();

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

export { routes };
