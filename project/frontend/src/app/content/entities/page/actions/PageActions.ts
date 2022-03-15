import { IData } from '~shared/_ifaces/content/IData';
import {
	PAGE_LOAD_SUCCESS,
	PAGE_LOAD_FAILED,
	PAGE_RESET,
	PAGE_LOADED,
} from '../consts/PageConsts';

export const pageLoadSuccessAction = (data: IData) => ({
	type: PAGE_LOAD_SUCCESS,
	payload: { data },
});

export const pageLoadFailedAction = (data: IData) => ({
	type: PAGE_LOAD_FAILED,
	payload: { data },
});

export const pageResetAction = () => ({
	type: PAGE_RESET,
});

export const pageLoadedAction = (loaded: boolean) => ({
	type: PAGE_LOADED,
	payload: {
		loaded	
	}
});

