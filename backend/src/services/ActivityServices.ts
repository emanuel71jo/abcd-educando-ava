import { getCustomRepository, Repository } from "typeorm";
import { Activity } from "../entities/Activity";
import { Module } from "../entities/Module";
import { User } from "../entities/User";
import { ActivitiesRepository } from "../repositories/ActivityRepository";

class ActivitiesService {
    private activitiesRepository: Repository<Activity>;

    constructor() {
        this.activitiesRepository = getCustomRepository(ActivitiesRepository);
    }

    async listAll(): Promise<Activity[]> {
        const activities = await this.activitiesRepository.find();
        return activities;
    }

    async create(
        nota: number,
        user: User,
        module: Module
    ): Promise<Activity> {

        const activity = new Activity();
        activity.nota = nota;
        activity.user = user;
        activity.module = module;
        const activityCreated = this.activitiesRepository.create(activity);

        await this.activitiesRepository.save(activityCreated);

        return activity;
    }
}

export { ActivitiesService };

