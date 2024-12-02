import { Hono } from "hono";
import userRouter from "./modules/users/users.routes";

const app = new Hono({ strict: false });

//

app.route("/users", userRouter);

export default app;
