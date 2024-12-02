import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "mysql",
	schema: "./src/modules/**/*.model.ts",
	out: "./src/migrations",
	casing: "snake_case",
	dbCredentials: {
		host: process.env.DB_HOST || "localhost",
		port: parseInt(process.env.DB_PORT || "3306"),
		user: process.env.DB_USERNAME || "root",
		password: process.env.DB_PASSWORD || "root",
		database: process.env.DB_DATABASE || "api_bun",
	},
});
