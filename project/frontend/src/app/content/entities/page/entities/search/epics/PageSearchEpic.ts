import { combineEpics, ofType } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

// const pageTVShowTaskEpic = action$ => action$.pipe(
// 	ofType(ADD_TASK),
// 	mergeMap(({ payload }) =>
// 		ajax.put(payload?.url).pipe(map((data: any) => addTaskCompletedAction(data)))
// 	)
// );

// export const pageTVShowTaskEpics = combineEpics(pageTVShowTaskEpic);