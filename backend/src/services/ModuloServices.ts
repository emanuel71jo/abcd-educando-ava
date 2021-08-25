import { getCustomRepository, Repository } from "typeorm";
import { Activity } from "../entities/Activity";
import { Module } from "../entities/Module";
import { Room } from "../entities/Room";
import { ModulesRepository } from "../repositories/ModuleRepository";

class ModulesService {
  private modulesRepository: Repository<Module>;

  constructor() {
    this.modulesRepository = getCustomRepository(ModulesRepository);
  }

  async listAll(): Promise<Module[]> {
    const modules = await this.modulesRepository.find();
    return modules;
  }

  async create(
    content: string,
    evaluation: string,
    room: Room,
    activities: Activity[]
  ): Promise<Module> {

    const module = new Module();
    module.content = content;
    module.evaluation = evaluation;
    module.room = room;
    module.activities = activities;

    const moduleCreated = this.modulesRepository.create(module);

    await this.modulesRepository.save(moduleCreated);

    return module;
  }

}

export { ModulesService };

