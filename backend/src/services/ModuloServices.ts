import { getCustomRepository, Repository } from "typeorm";
import { Module } from "../entities/Module";
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

  async findById(moduleId: string): Promise<Module> {
    const module = await this.modulesRepository.findOne({
      where: { id: moduleId },
    });
    return module;
  }

  async getTotalModulesUser(userId: string): Promise<number> {
    const totalModulesUser = await this.modulesRepository.count({
      where: {
        userId,
      },
    });

    return totalModulesUser;
  }

  async getTotalModulesRoom(roomId: string): Promise<number> {
    const totalModulesRoom = await this.modulesRepository.count({
      where: {
        roomId,
      },
    });

    return totalModulesRoom;
  }

  async getModuleUser(userId: string): Promise<Module[]> {
    const modulesUser = await this.modulesRepository.find({
      where: {
        userId,
      },
    });

    return modulesUser;
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
    userId: string
  ): Promise<Module> {
    const newModule = new Module();
    newModule.content = content;
    newModule.evaluation = evaluation;
    newModule.userId = userId;

    const moduleCreated = this.modulesRepository.create(newModule);

    await this.modulesRepository.save(moduleCreated);

    return moduleCreated;
  }

  async updateRoomId(modulesIds: string[], roomId: string): Promise<void> {
    const promise = modulesIds.map(async (id) => {
      const moduleFinded = await this.modulesRepository.findOne({
        where: { id },
      });
      moduleFinded.roomId = roomId;

      await this.modulesRepository.save(moduleFinded);
    });

    await Promise.all(promise);
  }
}

export { ModulesService };
