import { BaseRepository } from "./BaseRepository";

export abstract class BaseService<T> {
	protected repository: BaseRepository<any>;

	constructor(repository: BaseRepository<any>) {
		this.repository = repository;
	}

	async getAll(page: number = 1, limit: number = 10) {
		return this.repository.findAll(page, limit);
	}

	async getById(id: string) {
		return this.repository.findById(id);
	}

	async create(data: T) {
		return this.repository.create(data);
	}

	async update(id: string, data: Partial<T>) {
		return this.repository.update(id, data);
	}

	async delete(id: string) {
		return this.repository.delete(id);
	}
}
