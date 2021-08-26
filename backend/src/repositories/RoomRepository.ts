import { EntityRepository, Repository } from "typeorm";
import { Room } from "../entities/Room";

@EntityRepository(Room)
class RoomsRepository extends Repository<Room> {}

export { RoomsRepository };
