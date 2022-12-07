import { DataSource } from "typeorm";
import { User } from "../models";
import { AbstractRepositoryManager } from "../util";

export class UserManager extends AbstractRepositoryManager<User> {
    public constructor(dataSource: DataSource) {
        super(dataSource, User);
    }
}
