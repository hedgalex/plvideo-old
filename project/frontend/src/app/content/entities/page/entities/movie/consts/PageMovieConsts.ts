import { IState } from '~store/_ifaces/IState';
import { IDataItem } from '~shared/_ifaces/content/IDataItem';
import { IMovie } from '~shared/_ifaces/IMovie';

export const REST_URLS = {
	info: (name: string) => `/details/movie/${name}`,
}

export const contentMovieSelector = (state: IState): IDataItem<IMovie> => state.page.content as IDataItem<IMovie>;