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

  async getTotalActivitiesUser(userId: string): Promise<number> {
    const totalActivitiesUser = await this.activitiesRepository.count({
      where: {
        userId,
      },
    });
    return totalActivitiesUser;
  }

  async getTotalActivitiesTeacher(): Promise<number> {
    const totalActivitiesUser = await this.activitiesRepository.count();
    return totalActivitiesUser;
  }

  async findAll(): Promise<Activity[]> {
    const activities = await this.activitiesRepository.find();
    return activities;
  }

  async create(
    nota: number,
    userId: string,
    moduleId: string,
    title: string,
    description: string
  ): Promise<Activity> {
    const activity = new Activity();
    activity.nota = nota;
    activity.userId = userId;
    activity.moduleId = moduleId;
    activity.title = title;
    activity.description = description;

    const activityCreated = this.activitiesRepository.create(activity);

    await this.activitiesRepository.save(activityCreated);

    return activity;
  }
}

export { ActivitiesService };
