import { Configuration } from "./Configuration";
import { Property } from "./Property";

@Configuration(["file", "env"])
export class ExampleConfig {
    @Property(true, "0.0.0.0")
    public host: string;

    @Property(true, 4000)
    public port: number;

    @Property(true, "postgres")
    public database_type: string;

    @Property(true, "0.0.0.0")
    public database_host: string;

    @Property(true, 5432)
    public database_port: number;

    @Property(true, "choo_js_dev")
    public database_name: string;

    @Property(true, "postgres")
    public database_username: string;

    @Property(false)
    public database_password: string;
}
