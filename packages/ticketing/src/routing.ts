import { Controller, Post, Request, Reply, Put, ControllerImpl, Delete } from "@choo-js/coal/src";
import { FastifyReply, FastifyRequest } from "fastify";
import { hashPassword } from "./util/index.js";
import { UserManager } from "./repositories/index.js";
import { User } from "./models/index.js";

@Controller()
export class TicketingController implements ControllerImpl {
    @Post("/api/auth")
    public async login(@Request() req: FastifyRequest, @Reply() res: FastifyReply) {
        const source = req.server.orm;
        const manager = new UserManager(source);

        if (!req.body) {
            res.status(400);
            res.send({ code: 400, error: "Missing request body!" });
        }

        const { username, password } = req.body as Record<string, string>;

        if (!username || !password) {
            res.status(400);
            res.send({ code: 400, error: "Missing request parameters!" });
        }

        const hashed = hashPassword(password);
        const user = await manager.findBy({ username, password: hashed });
        
        if (user) {
            const real = user as Partial<User>;
            delete real.password;

            res.status(200);
            res.send(real);
        } else {
            res.status(401);
            res.send({ code: 401, error: "Invalid username or password!" });
        }
    }

    @Put("/api/auth")
    public async register(@Request() req: FastifyRequest, @Reply() res: FastifyReply) {
        const source = req.server.orm;
        const manager = new UserManager(source);

        if (!req.body) {
            res.status(400);
            res.send({ code: 400, error: "Missing request body!" });
        }

        const { username, password, firstName, lastName, email } = req.body as Record<string, string>;
        
        if (!username || !password || !firstName || !lastName || !email) {
            res.status(400);
            res.send({ code: 400, error: "Missing request parameters!" });
        }
        
        const hashed = hashPassword(password);
        const user = new User();
        
        user.username = username;
        user.password = hashed;
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        
        try {
            const finished = await manager.save(user);
            const real = finished as Partial<User>;

            delete real.password;

            res.status(200);
            res.send(real);
        } catch(_) {
            res.status(500);
            res.send({ code: 500, error: "Unable to save user!" });
        }
    }

    @Delete("/api/auth")
    public async unregister(@Request() req: FastifyRequest, @Reply() res: FastifyReply) {
        const source = req.server.orm;
        const manager = new UserManager(source);

        if (!req.body) {
            res.status(400);
            res.send({ code: 400, error: "Missing request body!" });
        }

        const { username, password } = req.body as Record<string, string>;

        if (!username || !password) {
            res.status(400);
            res.send({ code: 400, error: "Missing request parameters!" });
        }

        const hashed = hashPassword(password);
        const user = await manager.findBy({ username, password: hashed });
        
        if (user) {
            try {
                const real: Partial<User> = await manager.remove(user);
                delete real.password;

                res.status(200);
                res.send(real);
            } catch(e) {
                res.status(500);
                res.send({ code: 500, error: "Unable to delete user!" });
            }
        } else {
            res.status(401);
            res.send({ code: 401, error: "Invalid username or password!" });
        }
    }
}
