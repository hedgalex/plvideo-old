import { PAGE_LOAD_BEGIN } from '../../../consts/PageConsts';
import { MOVIES_REST_URLS } from '../consts/PageMoviesConsts';

export const fetchMoviesAction = (page: number) => ({
	type: PAGE_LOAD_BEGIN,
	payload: {
		url: MOVIES_REST_URLS.search(page)
	},
});
