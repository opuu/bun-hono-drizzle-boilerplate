import { BaseService } from "../../core/BaseService";
import { UsersRepository } from "./users.repository";
import type { NewUser, User } from "./users.model";
import { v4 as uuidv4 } from "uuid";

export class UsersService extends BaseService<User> {
	private usersRepository: UsersRepository;

	constructor(repository: UsersRepository) {
		super(repository);
		this.usersRepository = repository;
	}

	async create(data: NewUser) {
		// Hash password before storing
		const hashedPassword = await Bun.password.hash(data.password as string);

		const newUser = {
			...data,
			id: uuidv4(),
			password: hashedPassword,
		};

		return this.usersRepository.create(newUser);
	}
}
