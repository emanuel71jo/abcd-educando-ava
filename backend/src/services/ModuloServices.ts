import { getCustomRepository, Repository } from "typeorm";
import { Activity } from "../entities/Activity";
import { Module } from "../entities/Module";
import { Room } from "../entities/Room";
import { ModulesRepository } from "../repositories/ModuleRepository";
import { RoomsService } from "./RoomServices";
import { UsersService } from "./UsersServices";

class ModulesService {
  private modulesRepository: Repository<Module>;

  constructor() {
    this.modulesRepository = getCustomRepository(ModulesRepository);
  }

  async listAll(): Promise<Module[]> {
    const modules = await this.modulesRepository.find();
    return modules;
  }

  async findById(moduleId: string): Promise<Module> {
    const module = await this.modulesRepository.findOne({
      where: { id: moduleId },
    });
    return module;
  }

  async findByUserId(userId: string): Promise<Module[]> {
    const modules = await this.modulesRepository.find({
      where: { userId },
    });
    return modules;
  }

  async create(
    content: string,
    evaluation: string,
    roomId: string,
    userId: string
  ): Promise<Module> {
    const module = new Module();
    module.content = content;
    module.evaluation = evaluation;
    module.roomId = roomId;
    module.userId = userId;

    const moduleCreated = this.modulesRepository.create(module);

    await this.modulesRepository.save(moduleCreated);

    return module;
  }
}

export { ModulesService };
