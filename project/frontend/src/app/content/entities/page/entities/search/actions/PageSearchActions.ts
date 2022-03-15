import { PAGE_LOAD_BEGIN } from '../../../consts/PageConsts';
import { SEARCH_REST_URLS } from '../consts/PageSearchConsts';

export const fetchSearchAction = (text: string) => ({
	type: PAGE_LOAD_BEGIN,
	payload: {
		url: SEARCH_REST_URLS.searchByText(text)
	},
});