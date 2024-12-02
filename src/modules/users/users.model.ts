import { mysqlTable, varchar, timestamp, primaryKey } from "drizzle-orm/mysql-core";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const users = mysqlTable("users", {
	id: varchar("id", { length: 36 }).primaryKey(),
	email: varchar("email", { length: 255 }).unique(),
	name: varchar("name", { length: 255 }),
	password: varchar("password", { length: 255 }),
	tenantId: varchar("tenant_id", { length: 36 }),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
	deletedAt: timestamp("deleted_at"),
});

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
