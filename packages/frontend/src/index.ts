import { DEV, PROD } from "@choo-js/bundler";
import {
    Context,
    Controller,
    Get,
    Reply,
    Request,
    type RouterContext,
} from "@choo-js/coal";
import type { FastifyReply, FastifyRequest } from "fastify";

@Controller()
export class FrontendController {
    @Get("*")
    public async all(
        @Request() req: FastifyRequest,
        @Reply() res: FastifyReply,
        @Context() ctx: RouterContext<unknown>
    ) {
        const ctrl = ctx.env.isDev
            ? new DEV.Controller()
            : new PROD.Controller();

        await ctrl.serveAsset(req, res, process.cwd());
    }
}
