import * as React from 'react';
import { INav } from '../_ifaces/INav';
import { INavItem } from '../components/_ifaces/INavItem';

export type TNav = React.FC<INav> & {
	Item?: React.FC<INavItem>;
}