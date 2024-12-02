import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
	host: process.env.DB_HOST || "localhost",
	port: parseInt(process.env.DB_PORT || "3306"),
	user: process.env.DB_USERNAME || "root",
	password: process.env.DB_PASSWORD || "password",
	database: process.env.DB_DATABASE || "api_bun",
	waitForConnections: true,
});

export const db = drizzle(pool);
