import { IState } from '~store/_ifaces/IState';
import { ITask } from '~shared/_ifaces/ITask';

export const tasksSelector = (state: IState): ITask[] => state.tasks;