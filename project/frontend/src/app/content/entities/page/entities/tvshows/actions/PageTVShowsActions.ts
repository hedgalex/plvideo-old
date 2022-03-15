import { TVSHOWS_REST_URLS } from '../consts/PageTVShowsConsts';
import { PAGE_LOAD_BEGIN } from '../../../consts/PageConsts';

export const fetchTVShowsAction = (page: number) => ({
	type: PAGE_LOAD_BEGIN,
	payload: {
		url: TVSHOWS_REST_URLS.search(page),
	},
});