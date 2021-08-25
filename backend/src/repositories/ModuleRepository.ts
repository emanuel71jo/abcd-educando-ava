import { EntityRepository, Repository } from "typeorm";
import { Module } from "../entities/Module";

@EntityRepository(Module)
class ModulesRepository extends Repository<Module> {}

export { ModulesRepository };
