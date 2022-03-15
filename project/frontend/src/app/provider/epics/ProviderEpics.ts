import { ajax } from 'rxjs/ajax';
import { EMPTY, of } from 'rxjs';
import { combineEpics, ofType } from 'redux-observable';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { IDataItem } from '~shared/_ifaces/content/IDataItem';
import { IResponse } from '~shared/_ifaces/content/IResponse';
import { IResponseError } from '~shared/_ifaces/content/IResponseError';
import { IResponseSuccess } from '~shared/_ifaces/content/IResponseSuccess';
import { pageLoadedAction } from '~page/actions/PageActions';
import { 
	REST_URLS,
	PROVIDER_LOAD,
	PROVIDER_CHANGE,
} from '../consts/ProviderConsts';
import {
	providerLoadSuccessAction,
	providerLoadFailedAction,
	providerChangeSuccessAction,
	providerChangeFailedAction,
} from '../actions/ProviderActions';

const providerLoadEpic = (action$: any) => action$.pipe(
	ofType(PROVIDER_LOAD),
	mergeMap(() =>
		ajax.getJSON(REST_URLS.provider()).pipe(
			map((response: IResponse) => {
				if (!response?.success) {
					return providerLoadFailedAction((response as IResponseError)?.error);
				}

				const { data = {} } = response as IResponseSuccess;
				const { item } = data as IDataItem<any>;

				return providerLoadSuccessAction(item);
			}),
			catchError((error: any) => of(providerLoadFailedAction(error.xhr.response)))
		)
	)
);

const providerChangeEpic = (action$: any) => action$.pipe(
	ofType(PROVIDER_CHANGE),
	mergeMap(({ payload }) => 
		ajax.post(REST_URLS.changeProvider(payload.provider)).pipe(
			map(({ response }: any) => {
				if (!response?.success) {
					return providerChangeFailedAction((response as IResponseError)?.error);
				}
				
				const { data = {} } = response as IResponseSuccess;
				const { item } = data as IDataItem<any>;

				return providerChangeSuccessAction(item);
			}),
			map(() => pageLoadedAction(false)),
			catchError((error: any) => of(providerChangeFailedAction(error.xhr.response)))
		)
	)
);

export const providerEpics = combineEpics(providerLoadEpic, providerChangeEpic);