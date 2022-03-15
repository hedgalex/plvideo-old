import { ITask } from '~shared/_ifaces/ITask';
import { ITaskDAO } from './_ifaces/ITaskDAO';
import { EStatus } from '~shared/_enums/EStatus';
import { TASKS } from '../tables/Tasks';
import { STATUS } from '../tables/Status';

const TASK_FIELDS = [
	TASKS.field(TASKS.name),
	TASKS.field(TASKS.showname),
	TASKS.field(TASKS.origin_id),
	TASKS.field(TASKS.episode),
	TASKS.field(TASKS.season),
	TASKS.field(TASKS.title),
	TASKS.field(TASKS.image),
	TASKS.field(TASKS.progress),
	TASKS.field(TASKS.size),
	STATUS.field(STATUS.status),
];

const FULL_TASK_FIELDS = [
	...TASK_FIELDS,
	`${TASKS.field(TASKS.id)} as id`,
	TASKS.field(TASKS.path),
	TASKS.field(TASKS.url),
];

const DOWNLOAD_TASK_FIELDS = [
	...TASK_FIELDS,
	`${TASKS.field(TASKS.origin_id)} as id`,
];

export class TaskDAO implements ITaskDAO {

	private client;
	private statuses;

	constructor(client) {
		this.client = client;
	}

	public getStatuses = async () => {
		if (!this.statuses) {
			this.statuses = await this.client.select(STATUS.NAME);
		}

		return this.statuses;
	}

	public getFullTasks = async (): Promise<ITask[]> =>
		this.client
			.select(...FULL_TASK_FIELDS)
			.from(TASKS.NAME)
			.leftJoin(STATUS.NAME, TASKS.field(TASKS.status_id), STATUS.field(STATUS.id))
			.orderBy(TASKS.id);

	public getTasks = async (): Promise<ITask[]> =>
		this.client
			.select(...TASK_FIELDS)
			.from(TASKS.NAME)
			.leftJoin(STATUS.NAME, TASKS.field(TASKS.status_id), STATUS.field(STATUS.id));

	public getDownloads = async (): Promise<ITask[]> =>
		this.client
			.select(...DOWNLOAD_TASK_FIELDS)
			.from(TASKS.NAME)
			.leftJoin(STATUS.NAME, TASKS.field(TASKS.status_id), STATUS.field(STATUS.id));

	public getTaskByName = async (name: string): Promise<ITask> => {
		return this.client
			.select(...TASK_FIELDS)
			.from(TASKS.NAME)
			.leftJoin(STATUS.NAME, TASKS.field(TASKS.status_id), STATUS.field(STATUS.id))
			.where(TASKS.field(TASKS.name), '=', name)
			.first();
	}


	public addTask = async (task: ITask): Promise<ITask> => {
		const _task = await this.getTaskByName(task.name);
		if (!_task) {
			return this
				.client(TASKS.NAME)
				.insert(task);
		}
		return _task;
	}
	public reset = async (): Promise<any> =>
		this.client(TASKS.NAME)
			.update({ status_id: 1 })
			.where({ status_id: 2 })

	public getStatusIdByName = async (status: EStatus): Promise<any> => {
		const { id } = await this.client
			.select('id')
			.from(STATUS.NAME)
			.where({ status })
			.first();

		return id;
	}

	private getTaskByStatus = async (status: EStatus): Promise<ITask> =>
		this.client(TASKS.NAME)
			.select(...FULL_TASK_FIELDS)
			.from(TASKS.NAME)
			.leftJoin(STATUS.NAME, TASKS.field(TASKS.status_id), STATUS.field(STATUS.id))
			.where(STATUS.field(STATUS.status), '=', status)
			.first();

	public getInProgressTask = async (): Promise<ITask> => await this.getTaskByStatus(EStatus.IN_PROGRESS);

	public getIdleTask = async (): Promise<ITask> => await this.getTaskByStatus(EStatus.IDLE);

	public setProgress = async (id: number, progress: number): Promise<any> => {
		await this.client(TASKS.NAME)
			.where({ id })
			.update({ progress });
	}

	public setSize = async (id: number, size: number): Promise<any> => {
		const status_id: number = await this.getStatusIdByName(EStatus.IN_PROGRESS);
		await this.client(TASKS.NAME)
			.where({ id })
			.update({ size, status_id });
	}

	public setStatus = async (id: number, status: EStatus): Promise<any> => {
		const status_id: number = await this.getStatusIdByName(status);
		await this.client(TASKS.NAME)
			.where({ id })
			.update({ status_id });
	}

	public removeTaskByName = async (name: string): Promise<boolean> =>
		await this.client(TASKS.NAME)
			.where({ name })
			.delete();
}