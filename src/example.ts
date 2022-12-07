import { FastifyRequest, FastifyReply } from "fastify";
import {
    Controller,
    ControllerImpl,
    Get,
    Reply,
    Request,
} from "../packages/coal/src/index.js";

@Controller()
export class ExampleController implements ControllerImpl {
    @Get("/hello/:name")
    public async hello(
        @Request() req: FastifyRequest,
        @Reply() res: FastifyReply
    ) {
        res.send("Hello, " + (req.params as any).name + "!");
    }

    @Get("/")
    public async index(@Reply() res: FastifyReply) {
        res.send("Hello, world!");
    }
}
