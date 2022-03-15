import {
	PAGE_DEFAULT,
	PAGE_LOAD_SUCCESS,
	PAGE_LOAD_FAILED,
	PAGE_LOADED,
	PAGE_RESET,
} from '../consts/PageConsts';
import { IPage } from '../_ifaces/IPage';

export const pageReducer = (page: IPage = { ...PAGE_DEFAULT }, { type, payload }): IPage => {
	switch (type) {
		case PAGE_RESET: {
			return {
				...PAGE_DEFAULT,
				loaded: false,
			};
		}
		case PAGE_LOAD_SUCCESS: {
			const { data: content } = payload;
			const { pageNumber = 0, items = [] } = content;

			// if (pageNumber) {
			// 	const oldData: IContent = page?.data;
			// 	const oldItems = oldData?.items;
			//
			// 	return {
			// 		...page,
			// 		loaded: true,
			// 		data: {
			// 			...data,
			// 			items: [
			// 				...oldItems,
			// 				...items
			// 			]
			// 		},
			// 	};
			// }

			return {
				loaded: true,
				content,
			};
		}
		case PAGE_LOAD_FAILED: {
			console.error('Failed', payload);
			return page;
		}
		case PAGE_LOADED: {
			const { loaded } = payload;
			return {
				...page,
				loaded
			};
		}
		default: {
			return page;
		}
	}
};
