import { combineEpics, ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { IResponse } from '~shared/_ifaces/content/IResponse';
import { IResponseError } from '~shared/_ifaces/content/IResponseError';
import { IResponseSuccess } from '~shared/_ifaces/content/IResponseSuccess';
import { PAGE_LOAD_BEGIN } from '../consts/PageConsts';
import { 
	pageLoadSuccessAction,
	pageLoadFailedAction, 
} from '../actions/PageActions';
import { of } from 'rxjs';

const pageLoadStartEpic = (action$: any) => action$.pipe(
	ofType(PAGE_LOAD_BEGIN),
	mergeMap(({ payload }) =>
		ajax.getJSON(payload?.url).pipe(
			map((response: IResponse) => {
				if (!response?.success) {
					pageLoadFailedAction((response as IResponseError)?.error);
				}

				return pageLoadSuccessAction((response as IResponseSuccess)?.data);
			}),
			catchError((error: any) => {
				console.error('temporary', error.xhr.response);
				return of(pageLoadFailedAction(error.xhr.response));
			})
		)
	)
);

export const pageEpics = combineEpics(pageLoadStartEpic);