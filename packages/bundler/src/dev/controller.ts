import type { FastifyRequest, FastifyReply } from "fastify";
import { getAssetContents, serveAsset } from "./serveAsset";

export class Controller {
    public async serveAsset(
        req: FastifyRequest,
        res: FastifyReply,
        base: string
    ) {
        const info = await serveAsset(req.url, base);
        const content = getAssetContents(info.path, info.content);

        res.code(info.code);
        res.type(!info.mime ? "text/plain" : info.mime);
        res.send(content);
    }
}
