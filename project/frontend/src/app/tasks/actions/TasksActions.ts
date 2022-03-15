import {
	TASK_LOAD,
	TASK_LOAD_SUCCESS, 
	TASK_LOAD_FAILED, 
	TASK_ADD, 
	TASK_ADD_SUCCESS, 
	TASK_ADD_FAILED,
	TASK_REMOVE, 
	TASK_REMOVE_SUCCESS,
	TASK_REMOVE_FAILED,
} from '../consts/TasksConsts';
import { ITask } from '~shared/_ifaces/ITask';

/** Loading */
export const taskLoadAction = () => ({
	type: TASK_LOAD
});

export const taskLoadSuccessAction = (tasks: ITask[]) => ({
	type: TASK_LOAD_SUCCESS,
	payload: { tasks },
});

export const taskLoadFailedAction = (error: any) => ({
	type: TASK_LOAD_FAILED,
	payload: { error },
});

/** Adding */
export const taskAddAction = (name: string) => ({
	type: TASK_ADD,
	payload: { name },
});

export const taskAddSuccessAction = (task: ITask) => ({
	type: TASK_ADD_SUCCESS,
	payload: { task },
});

export const taskAddFailedAction = (error: any) => ({
	type: TASK_ADD_FAILED,
	payload: { error },
});

/** Removing */
export const taskRemoveAction = (name: string) => ({
	type: TASK_REMOVE,
	payload: { name },
});

export const taskRemoveSuccessAction = (name: string) => ({
	type: TASK_REMOVE_SUCCESS,
	payload: { name },
});

export const taskRemoveFailedAction = (error: any) => ({
	type: TASK_REMOVE_FAILED,
	payload: { error },
});