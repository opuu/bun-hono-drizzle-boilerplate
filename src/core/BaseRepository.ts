import { SQL, and, eq, sql } from "drizzle-orm";
import { MySqlTable } from "drizzle-orm/mysql-core";
import type { Column, ColumnBaseConfig, ColumnDataType } from "drizzle-orm";
import { db } from "../config/database";

interface TableWithId extends MySqlTable {
	id: Column<ColumnBaseConfig<ColumnDataType, string>>;
}

export class BaseRepository<T extends TableWithId> {
	protected table: T;

	constructor(table: T) {
		this.table = table;
	}

	async findAll(page: number = 1, limit: number = 10) {
		const offset = (page - 1) * limit;

		// Fetch total count
		const [countResult] = await db.select({ count: sql<number>`count(*)`.as("count") }).from(this.table);

		// Fetch paginated results
		const results = await db.select().from(this.table).limit(limit).offset(offset);

		return {
			data: results as T["$inferSelect"][],
			total: Number(countResult.count),
		};
	}

	async findById(id: string | number) {
		const [result] = await db.select().from(this.table).where(eq(this.table.id, id)).limit(1);

		return result as T["$inferSelect"] | undefined;
	}

	async create(data: T["$inferInsert"]) {
		const [result] = await db.insert(this.table).values(data).$returningId();

		return result as T["$inferSelect"];
	}

	async update(id: string | number, data: Partial<T["$inferInsert"]>) {
		const [result] = await db.update(this.table).set(data).where(eq(this.table.id, id));

		return result;
	}

	async delete(id: string | number) {
		const [result] = await db.delete(this.table).where(eq(this.table.id, id));

		return result;
	}
}
