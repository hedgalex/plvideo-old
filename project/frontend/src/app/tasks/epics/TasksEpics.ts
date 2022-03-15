import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { combineEpics, ofType } from 'redux-observable';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ITask } from '~shared/_ifaces/ITask';
import { IDataList } from '~shared/_ifaces/content/IDataList';
import { IResponse } from '~shared/_ifaces/content/IResponse';
import { IResponseError } from '~shared/_ifaces/content/IResponseError';
import { IResponseSuccess } from '~shared/_ifaces/content/IResponseSuccess';
import { 
	REST_URLS, 
	TASK_LOAD,
	TASK_ADD, 
	TASK_REMOVE, 
} from '../consts/TasksConsts';
import {
	taskLoadSuccessAction,
	taskLoadFailedAction,
	taskAddSuccessAction,
	taskAddFailedAction,
	taskRemoveSuccessAction,
	taskRemoveFailedAction,
} from '../actions/TasksActions';
import { IDataItem } from '../../../_ifaces/content/IDataItem';

const taskLoadEpic = (action$: any) => action$.pipe(
	ofType(TASK_LOAD),
	mergeMap(() =>
		ajax.getJSON(REST_URLS.tasks).pipe(
			map((response: IResponse) => {
				if (!response?.success) {
					return taskLoadFailedAction((response as IResponseError)?.error);
				}

				const { data = { items: [] } } = response as IResponseSuccess;
				const { items } = data as IDataList<ITask>;

				return taskLoadSuccessAction(items);
			}),
			catchError((error: any) => of(taskLoadFailedAction(error.xhr.response)))
		)
	)
);

const taskAddEpic = (action$: any) => action$.pipe(
	ofType(TASK_ADD),
	mergeMap(({ payload }) => 
		ajax.put(REST_URLS.add(payload.name)).pipe(
			map(({ response }: any) => {
				if (!response?.success) {
					return taskAddFailedAction((response as IResponseError)?.error);
				}
				
				const { data = { item: '' } } = response as IResponseSuccess;
				const { item } = data as IDataItem<ITask>;

				return taskAddSuccessAction(item);
			}),
			catchError((error: any) => of(taskAddFailedAction(error.xhr.response)))
		)
	)
);

const taskRemoveEpic = (action$: any) => action$.pipe(
	ofType(TASK_REMOVE),
	mergeMap(({ payload }) => 
		ajax.delete(REST_URLS.remove(payload.name)).pipe(
			map(({ response }: any) => {
				if (!response?.success) {
					return taskRemoveFailedAction((response as IResponseError)?.error);
				}
				
				const { data = { name: '' } } = response as IResponseSuccess;
				const { item: name } = data as IDataItem<string>;

				return taskRemoveSuccessAction(name);
			}),
			catchError((error: any) => of(taskRemoveFailedAction(error.xhr.response)))
	))
);

export const tasksEpics = combineEpics(taskLoadEpic, taskAddEpic, taskRemoveEpic);