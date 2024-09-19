import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

    @Column({ unique: true })
    public username: string;

    @Column()
    public password: string;

    @Column()
    public email: string;

    /**
     * A JSON-serialized field for any extra data you may
     * want to include.
     */
    @Column()
    public extraData: string;
}
