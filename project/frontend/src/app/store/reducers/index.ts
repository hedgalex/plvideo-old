import { combineReducers } from 'redux';
import { pageReducer } from '~page/reducers/PageReducer';
import { tasksReducer } from '~tasks/reducers/TasksReducer';
import { providerReducer } from '~app/provider/reducers/ProviderReducer';

export const reducers = combineReducers({
	page: pageReducer,
	tasks: tasksReducer,
	provider: providerReducer,
});