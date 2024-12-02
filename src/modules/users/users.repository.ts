import { BaseRepository } from "../../core/BaseRepository";
import { users } from "./users.model";

export class UsersRepository extends BaseRepository<typeof users> {
	constructor() {
		super(users);
	}
}
