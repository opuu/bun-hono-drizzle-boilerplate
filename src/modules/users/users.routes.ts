import { Hono } from "hono";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UsersRepository } from "./users.repository";

const app = new Hono();
const repository = new UsersRepository();
const service = new UsersService(repository);
const controller = new UsersController(service);

app.get("/", controller.getAll.bind(controller));
app.get("/:id", controller.getById.bind(controller));
app.post("/", controller.create.bind(controller));
app.put("/:id", controller.update.bind(controller));
app.delete("/:id", controller.delete.bind(controller));
app.post("/register", controller.register.bind(controller));

export default app;
