import type { Context } from "hono";
import { BaseService } from "./BaseService";

export abstract class BaseController<T> {
	protected service: BaseService<T>;

	constructor(service: BaseService<T>) {
		this.service = service;
	}

	async getAll(c: Context) {
		try {
			const { page = 1, limit = 10, ...filters } = c.req.query();
			const parsedPage = Number(page);
			const parsedLimit = Number(limit);

			const result = await this.service.getAll(parsedPage, parsedLimit);

			return c.json({
				data: result.data,
				meta: {
					page: parsedPage,
					limit: parsedLimit,
					total: result.total,
				},
			});
		} catch (error) {
			return this.handleError(c, error);
		}
	}

	async getById(c: Context) {
		try {
			const id = c.req.param("id");
			const result = await this.service.getById(id);

			if (!result) {
				return c.json({ message: "Not Found" }, 404);
			}

			return c.json(result);
		} catch (error) {
			return this.handleError(c, error);
		}
	}

	async create(c: Context) {
		try {
			const body = await c.req.json();
			const result = await this.service.create(body);

			return c.json(result, 201);
		} catch (error) {
			return this.handleError(c, error);
		}
	}

	async update(c: Context) {
		try {
			const id = c.req.param("id");
			const body = await c.req.json();

			const result = await this.service.update(id, body);

			if (!result) {
				return c.json({ message: "Not Found" }, 404);
			}

			return c.json(result);
		} catch (error) {
			return this.handleError(c, error);
		}
	}

	async delete(c: Context) {
		try {
			const id = c.req.param("id");

			const result = await this.service.delete(id);

			if (!result) {
				return c.json({ message: "Not Found" }, 404);
			}

			return c.json({ message: "Deleted successfully" });
		} catch (error) {
			return this.handleError(c, error);
		}
	}

	protected handleError(c: Context, error: unknown) {
		console.error(error);

		if (error instanceof Error) {
			return c.json(
				{
					message: "An error occurred",
					error: error.message,
				},
				500
			);
		}

		return c.json(
			{
				message: "An unknown error occurred",
			},
			500
		);
	}
}
