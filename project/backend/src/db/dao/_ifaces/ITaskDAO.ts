import { ITask } from '~shared/_ifaces/ITask';
import { EStatus } from '~shared/_enums/EStatus';

export interface ITaskDAO {
	getStatusIdByName (status: string): Promise<EStatus[]>;
	getFullTasks (): Promise<ITask[]>;
	getTaskByName (url: string): Promise<ITask>;
	addTask (task: ITask): Promise<any>;
	removeTaskByName (name: string): Promise<boolean>;
}