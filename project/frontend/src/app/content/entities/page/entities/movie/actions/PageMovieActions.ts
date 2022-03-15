import { PAGE_LOAD_BEGIN } from '../../../consts/PageConsts';
import { REST_URLS } from '../consts/PageMovieConsts';

export const fetchMovieAction = (name: string) => ({
	type: PAGE_LOAD_BEGIN,
	payload: { url: REST_URLS.info(name) },
});