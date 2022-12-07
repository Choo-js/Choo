import { DataSource, ObjectLiteral, Repository } from "typeorm";

export class AbstractRepositoryManager<T extends ObjectLiteral> {
    private repository: Repository<T>;

    public constructor(dataSource: DataSource, _o: any) {
        this.repository = dataSource.getRepository(_o);
    }

    public async save(obj: T) {
        return await this.repository.save(obj);
    }

    public async findAll() {
        return await this.repository.find();
    }

    public async findBy(filter: Partial<T>) {
        return await this.repository.findOneBy(filter);
    }

    public async findAllBy(filter: Partial<T>) {
        return await this.repository.findBy(filter);
    }

    public async remove(obj: T) {
        return await this.repository.remove(obj);
    }
}
