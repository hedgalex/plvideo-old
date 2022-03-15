import { PAGE_DEFAULT } from '~page/consts/PageConsts';
import { IState } from '../_ifaces/IState';

export const INIT_STATE: IState = {
	page: { ...PAGE_DEFAULT },
	tasks: [],
	provider: null,
};