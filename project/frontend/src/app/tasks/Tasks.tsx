import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EStatus } from '~shared/_enums/EStatus';
import { tasksSelector } from './selectors/TasksSelectors';
import { 
	taskAddAction, 
	taskLoadAction, 
	taskRemoveAction 
} from './actions/TasksActions';
import { Provider } from './context/TasksContext';

export const Tasks: React.FC = (props) => {
	const {
		children,
	} = props;

	const tasks = useSelector(tasksSelector);
	const dispatch = useDispatch();
	const [timer, setTimer] = useState(false);
	const changeTaskStatus = (name: string, status: EStatus) => {
		switch (status) {
			case EStatus.NO_STATUS: {
				dispatch(taskAddAction(name));
				break;
			}
			case EStatus.IN_PROGRESS:
			case EStatus.READY:
			case EStatus.IDLE:	{
				dispatch(taskRemoveAction(name));
				break;
			}
		}
	};

	useEffect(() => {

		dispatch(taskLoadAction());
		setTimeout(() => {
			setTimer(!timer);
		}, 5000);

	}, [timer]);

	return (
		<Provider value={{tasks, changeTaskStatus}}>
			{children}
		</Provider>
	)
};