import { IState } from '~store/_ifaces/IState';
import { IDataItem } from '~shared/_ifaces/content/IDataItem';
import { ITVShow } from '~shared/_ifaces/ITVShow';

export const REST_URLS = {
	info: (name: string) => `/details/tvshow/${name}`,
}

export const contentTVShowSelector = (state: IState): IDataItem<ITVShow> => state.page.content as IDataItem<ITVShow>;