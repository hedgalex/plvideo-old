import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { reducers } from './reducers';
import { combinedEpics } from './epics';
import { IState } from './_ifaces/IState';
import { INIT_STATE } from './consts/StateConsts';

const epicMiddleware = createEpicMiddleware();

export const configureStore = (initialState: IState = INIT_STATE) => {
	const store = createStore(
		reducers,
		initialState,
		applyMiddleware(epicMiddleware)
	);

	epicMiddleware.run(combinedEpics);

	return store;
}
