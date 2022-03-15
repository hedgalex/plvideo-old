import { IState } from '~store/_ifaces/IState';
import { IPage } from '../_ifaces/IPage';

export const pageSelector = (state: IState): IPage => state.page;