// Hono
import { Hono } from "hono";
import { etag } from "hono/etag";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

// Other
import dotenv from "dotenv";
import { readdirSync } from "fs";
import { join } from "path";

// App
import { serverError, notFoundError } from "./middleware/errors";
import routes from "./routes";

dotenv.config();

const app = new Hono({ strict: false });

app.use(etag(), logger());

app.use(
	cors({
		origin: ["http://localhost:3000"],
		allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		allowHeaders: ["Content-Type"],
		maxAge: 86400,
		credentials: true,
		exposeHeaders: ["ETag"],
	})
);

app.notFound(notFoundError);
app.onError(serverError);

app.route("/v1", routes);

export default {
	port: process.env.APP_PORT || 8000,
	fetch: app.fetch,
};
