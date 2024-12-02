import app from "./src/app";

import dotenv from "dotenv";

dotenv.config();

const port = process.env.APP_PORT || 8000;

Bun.serve({
	port,
	fetch: app.fetch,
	development: process.env.APP_ENV === "local",
});

console.log(`Server running on http://localhost:${port}`);
