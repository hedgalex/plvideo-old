import { IState } from '~store/_ifaces/IState';
import { IDataList } from '~shared/_ifaces/content/IDataList';
import { ITVShow } from '~shared/_ifaces/ITVShow';

export const PAGE_TVSHOW_LOAD_BEGIN = 'PAGE_TVSHOW_LOAD_BEGIN';

export const TVSHOWS_REST_URLS = {
	search: page => `/scan${page ? `?page=${page}`: ''}`
}

export const contentTVShowsSelector = (state: IState): IDataList<ITVShow> => state.page.content as IDataList<ITVShow>;