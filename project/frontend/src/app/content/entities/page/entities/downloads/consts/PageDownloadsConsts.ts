import { IState } from '~store/_ifaces/IState';
import { IDataList } from '~shared/_ifaces/content/IDataList';
import { IShow } from '~shared/_ifaces/IShow';

export const DOWNLOADS_REST_URLS = {
	progress: () => `/progress`
}

export const contentDownloadsSelector = (state: IState): IDataList<IShow> => state?.page?.content as IDataList<IShow>;