import { getCustomRepository, Repository } from "typeorm";
import { Activity } from "../entities/Activity";
import { Module } from "../entities/Module";
import { User } from "../entities/User";
import { ActivitiesRepository } from "../repositories/ActivityRepository";
import { ModulesService } from "./ModuloServices";
import { UsersService } from "./UsersServices";

class ActivitiesService {
  private activitiesRepository: Repository<Activity>;

  constructor() {
    this.activitiesRepository = getCustomRepository(ActivitiesRepository);
  }

  async listAll(): Promise<Activity[]> {
    const activities = await this.activitiesRepository.find();
    return activities;
  }

  async findByUserId(userId: string): Promise<Activity[]> {
    const activities = await this.activitiesRepository.find({
      where: { userId },
    });
    return activities;
  }

  async create(
    nota: number,
    userId: string,
    moduleId: string
  ): Promise<Activity> {
    const activity = new Activity();
    activity.nota = nota;
    activity.userId = userId;
    activity.moduleId = moduleId;

    const activityCreated = this.activitiesRepository.create(activity);

    await this.activitiesRepository.save(activityCreated);

    return activity;
  }
}

export { ActivitiesService };
