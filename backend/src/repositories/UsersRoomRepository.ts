import { EntityRepository, Repository } from "typeorm";
import { UserRoom } from "../entities/UserRoom";

@EntityRepository(UserRoom)
class UsersRoomRepository extends Repository<UserRoom> {}

export { UsersRoomRepository };
