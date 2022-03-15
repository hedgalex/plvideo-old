import * as React from 'react';
import { EStatus } from '~shared/_enums/EStatus';

const TasksContext = React.createContext({ 
	tasks: [], 
	changeTaskStatus: (name: string, status: EStatus) => {}, 
});
const { Provider } = TasksContext;

export {
	Provider,
	TasksContext,
};