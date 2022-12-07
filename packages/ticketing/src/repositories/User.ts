import { DataSource } from "typeorm";
import { User } from "../models/User.js";
import { AbstractRepositoryManager } from "../util/AbstractRepository.js";

export class UserManager extends AbstractRepositoryManager<User> {
    public constructor(dataSource: DataSource) {
        super(dataSource, User);
    }
}
