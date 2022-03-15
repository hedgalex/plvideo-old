import { combineEpics } from 'redux-observable';
import { pageEpics } from '~page/epics/PageEpics';
import { tasksEpics } from '~tasks/epics/TasksEpics';
import { providerEpics } from '~app/provider/epics/ProviderEpics';

export const combinedEpics = combineEpics(pageEpics, tasksEpics, providerEpics);