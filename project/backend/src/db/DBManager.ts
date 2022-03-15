// @ts-ignore
import knex from 'knex';
import { TaskDAO } from './dao/TaskDAO';
import { config } from '~server/config';

class DBManager {
	private readonly client: any;
	private tasksDAO: TaskDAO;

	constructor() {
		this.client = knex(config.getKnexConfig());
	}

	public getTasksDAO = (): TaskDAO => {
		if (!this.tasksDAO) {
			this.tasksDAO = new TaskDAO(this.client);
		}

		return this.tasksDAO;
	}
}

const dbManager = new DBManager();

export { dbManager };