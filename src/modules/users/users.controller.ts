// src/modules/users/users.controller.ts
import { BaseController } from "../../core/BaseController";
import { UsersService } from "./users.service";
import type { User } from "./users.model";
import type { Context } from "hono";

export class UsersController extends BaseController<User> {
	constructor(service: UsersService) {
		super(service);
	}

	// You can override base methods or add custom methods here
	// For example, a method specific to user registration
	async register(c: Context) {
		try {
			const body = await c.req.json();
			const result = await (this.service as UsersService).create(body);

			return c.json(result, 201);
		} catch (error) {
			return this.handleError(c, error);
		}
	}
}
