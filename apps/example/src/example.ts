import type { FastifyRequest, FastifyReply } from "fastify";
import { Context, Controller, ControllerImpl, Get, Reply, Request, type RouterContext } from "@choo-js/coal";

@Controller()
export class ExampleController extends ControllerImpl {
    @Get("/hello/:name")
    public async hello(
        @Request() req: FastifyRequest,
        @Reply() res: FastifyReply,
    ) {
        res.send("Hello, " + (req.params as any).name + "!");
    }

    @Get("/context")
    public async context(
        @Reply() res: FastifyReply,
        @Context() ctx: RouterContext<unknown>,
    ) {
        res.send(`Context: ${JSON.stringify(ctx)}`);
    }

    @Get("/")
    public async index(@Reply() res: FastifyReply) {
        res.send("Hello, world!");
    }
}
