import { IPage } from '~page/_ifaces/IPage';

const PAGE_LOAD_BEGIN = 'PAGE_LOAD_BEGIN';
const PAGE_LOAD_SUCCESS = 'PAGE_LOAD_SUCCESS';
const	PAGE_LOAD_FAILED = 'PAGE_LOAD_FAILED';
const PAGE_LOADED = 'PAGE_LOADED';
const PAGE_RESET = 'SET_RESET';

export const PAGE_DEFAULT: IPage = {
	loaded: false,
	content: {}
}

export {
	PAGE_LOAD_BEGIN,
	PAGE_LOAD_SUCCESS,
	PAGE_LOAD_FAILED,
	PAGE_LOADED,
	PAGE_RESET,
};