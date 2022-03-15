import { ITask } from '~shared/_ifaces/ITask';
import { EStatus } from '~shared/_enums/EStatus';
import {
	TASK_LOAD_SUCCESS, 
	TASK_LOAD_FAILED, 
	TASK_ADD_SUCCESS, 
	TASK_ADD_FAILED,
	TASK_REMOVE_SUCCESS,
	TASK_REMOVE_FAILED,
} from '../consts/TasksConsts';
import { filter } from 'lodash';

export const tasksReducer = (tasks = [], { type, payload }): ITask[] => {
	switch (type) {
		case TASK_LOAD_SUCCESS: {
			const { tasks } = payload;
			return tasks;
		}
		case TASK_LOAD_FAILED: {
			const { error } = payload;
			return tasks;
		}
		case TASK_ADD_SUCCESS: {
			const { task = { name: '' } } = payload;
			const { name } = task as ITask;
			tasks = [
				...tasks,
				{
					name,
					status: EStatus.IDLE,
					progress: 0,
				}
			];
			return tasks;
		}
		case TASK_ADD_FAILED: {
			const { error } = payload;
			return tasks;
		}
		case TASK_REMOVE_SUCCESS: {
			const { name } = payload;
			tasks = filter(tasks, task => task.name !== name);
			return tasks;
		}
		case TASK_REMOVE_FAILED: {
			const { error } = payload;
			return tasks;
		}
		default: {
			return tasks;
		}
	}
};
