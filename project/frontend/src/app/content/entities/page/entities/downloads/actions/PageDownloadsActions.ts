import { PAGE_LOAD_BEGIN } from '../../../consts/PageConsts';
import { DOWNLOADS_REST_URLS } from '../consts/PageDownloadsConsts';

export const fetchDownloadsAction = () => ({
	type: PAGE_LOAD_BEGIN,
	payload: {
		url: DOWNLOADS_REST_URLS.progress(),
	},
});