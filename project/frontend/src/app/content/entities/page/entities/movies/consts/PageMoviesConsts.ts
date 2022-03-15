import { IState } from '~store/_ifaces/IState';
import { IMovie } from '~shared/_ifaces/IMovie';
import { IDataList } from '~shared/_ifaces/content/IDataList';

export const MOVIES_REST_URLS = {
	search: (page: number) => `/scan/type/movies${page ? `?page=${page}`: ''}`,
	addTask: (id: number, name: string) => `/addTask/movies/${name}/${id}`
}

export const contentMoviesSelector = (state: IState): IDataList<IMovie> => state.page.content as IDataList<IMovie>;