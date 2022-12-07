import { DEV } from "@choo-js/bundler";
import { Controller, Get, Reply, Request } from "@choo-js/coal";
import { FastifyReply, FastifyRequest } from "fastify";

@Controller()
export class FrontendController {
    @Get("*")
    public async all(@Request() req: FastifyRequest, @Reply() res: FastifyReply) {
        const ctrl = new DEV.Controller();

        await ctrl.serveAsset(req, res, process.cwd());
    }
}
