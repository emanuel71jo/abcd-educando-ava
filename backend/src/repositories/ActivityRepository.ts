import { EntityRepository, Repository } from "typeorm";
import { Activity } from "../entities/Activity";

@EntityRepository(Activity)
class ActivitiesRepository extends Repository<Activity> {}

export { ActivitiesRepository };
