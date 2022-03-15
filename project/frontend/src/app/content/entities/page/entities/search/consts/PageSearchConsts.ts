import { IState } from '~store/_ifaces/IState';
import { IDataList } from '~shared/_ifaces/content/IDataList';
import { IShow } from '~shared/_ifaces/IShow';

export const SEARCH_REST_URLS = {
	searchByText: (text: string) => `/searchByText?text=${text}`,
}

export const searchSelector = (state: IState): IDataList<IShow> => state.page.content as IDataList<IShow>;